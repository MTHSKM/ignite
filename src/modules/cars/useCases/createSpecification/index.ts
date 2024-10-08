import { SpecificationRepository } from "../../repositories/implementations/Specificationrepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const createSpecificationRepository = SpecificationRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(createSpecificationRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }