import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";



class SpecificationsRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = dataSource.getRepository(Specification)
    }
    
    /*
    public static getInstance(): SpecificationRepository{
        if(!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository()
        }
        return SpecificationRepository.INSTANCE
    }
    */
   
   async list(): Promise<Specification[]> {
       const specifications = await this.repository.find()
       return specifications
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne(({ where: { name } }))
        return specification;
    }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
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

       return specifications 
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids)
        return specifications
    }
}

export { SpecificationsRepository }