import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = []


    async create({email, driver_license, name, password}: ICreateUsersDTO): Promise<void> {
        const user = new User()
        Object.assign(user, {
            email, driver_license, name, password
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find( (user) => user.email === email )
    }

    async findById(id: string): Promise<User> {
        return this.users.find( (user) => user.id === id )
    }
}

export { UsersRepositoryInMemory }