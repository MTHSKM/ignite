import { SpecificationRepository } from "../../repositories/implementations/Specificationrepository";
import { ImportSpecificationController } from "./ImportSpecificationController";
import { ImportSpecificationUseCase } from "./ImportSpecificationUseCase";


const specificationRepository = SpecificationRepository.getInstance()
const importSpecificationUseCase = new ImportSpecificationUseCase(specificationRepository)
const importSpecificationController = new ImportSpecificationController(importSpecificationUseCase)

export { importSpecificationController }