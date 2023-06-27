import { Repository, getRepository } from "typeorm";
import { Category } from "../../entities/Category"
import { ICategoriesRepository, ICreatecategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>

    private static INSTANCE: CategoriesRepository

    private constructor() {
        this.repository = getRepository(Category);
    }

    public static getInstance(): CategoriesRepository {
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository()   
        }
        return CategoriesRepository.INSTANCE
    }

    async create({ name, description }: ICreatecategoryDTO): Promise<void> {
        /*
        const category = new Category();

        Object.assign(category, { name, description, created_at: new Date() })
        */

        const category = this.repository.create({
            name,
            description
        })
    
        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find()
        return categories
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne(({ where: {name} }))
        return category;
    }
}

export { CategoriesRepository }