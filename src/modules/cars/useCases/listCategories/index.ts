import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategorieController } from "./ListCategorieController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategorieController(listCategoriesUseCase)

export { listCategoriesController }