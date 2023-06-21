import { Category } from "../model/Category";

interface ICreatecategoryDTO{
    name: string,
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Category
    list(): Category[]
    create({name, description}: ICreatecategoryDTO): void
}

export { ICategoriesRepository, ICreatecategoryDTO }