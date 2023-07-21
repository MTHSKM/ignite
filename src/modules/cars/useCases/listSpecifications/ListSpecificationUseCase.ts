import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationUseCase{
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationRepository ){}

    async execute(): Promise<Specification[]>{
        const specification = await this.specificationRepository.list()

        return specification
    }
}

export { ListSpecificationUseCase }