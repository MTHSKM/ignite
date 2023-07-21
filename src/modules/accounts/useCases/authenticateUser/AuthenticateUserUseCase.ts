import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"

interface IRequest {
    email:string,
    password: string
}

interface IResponse {
    user: {
        name:string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({ email,password }:IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError("Email or Password incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new AppError("Email or Password incorrect!")
        }

        const token = sign({}, "db544415bc01cf5b9c52b10722a1252a", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user:{
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }