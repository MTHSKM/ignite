import { Repository } from "typeorm";
import { ICreateUsersDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";
import { dataSource } from "@shared/infra/typeorm";



class UsersRepository implements IUsersRepository {
    private repository: Repository<User>
    
    constructor(){
        this.repository = dataSource.getRepository(User)
    }

    async create({ name, email, driver_license, password, avatar, id }: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        })

        await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne(({ where : {email}}))
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(({ where : {id}}))
        return user
    }
}

export { UsersRepository }