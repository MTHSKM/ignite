import auth from "@config/auth"
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

interface IPayLoad{
    sub: string,
    email: string
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute(token: string){
        const { email,sub } = verify(token, auth.secret_refresh_token) as IPayLoad
        
        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

        if(!userToken){
            throw new AppError("Refresh Token does not exists!")
        };

        await this.usersTokensRepository.deleteById(userToken.id)

        
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })
        
        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)
        
        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        })

        return refresh_token
    }
}

export { RefreshTokenUseCase }