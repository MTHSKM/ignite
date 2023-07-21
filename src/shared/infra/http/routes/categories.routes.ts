import { Router } from 'express';
import multer from "multer"
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategorieController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCatergory/ImportCategoryController';
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController"
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const categoriesRoutes = Router();

const upload = multer({dest: './tmp/categories'})

const createCategoryController = new CreateCategoryController()
const importCatergoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)
categoriesRoutes.get("/", listCategoriesController.handle)
categoriesRoutes.post("/import", upload.single("file"), ensureAuthenticated, ensureAdmin, importCatergoryController.handle)

export { categoriesRoutes };