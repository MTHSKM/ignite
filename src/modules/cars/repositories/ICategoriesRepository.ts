import { Category } from "../entities/Category";

interface ICreatecategoryDTO{
    name: string,
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>
    list(): Promise<Category[]>
    create({name, description}: ICreatecategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreatecategoryDTO }