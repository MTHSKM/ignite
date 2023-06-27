import { Repository, getRepository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";



class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    private static INSTANCE: SpecificationRepository

    private constructor(){
        this.repository = getRepository(Specification)
    }

    public static getInstance(): SpecificationRepository{
        if(!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository()
        }
        return SpecificationRepository.INSTANCE
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find()
        return specifications
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne(({where: {name}}))
        return specification;
    }

    async create({name, description}: ICreateSpecificationDTO):Promise<void> {
        /*
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            creaed_at: new Date()
        })
        */

        const specifications = this.repository.create({
            name,
            description
        })

        await this.repository.save(specifications)
    }
}

export { SpecificationRepository }