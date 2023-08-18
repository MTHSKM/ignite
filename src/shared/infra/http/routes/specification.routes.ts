import { Router } from "express"
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationController } from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationController"
import multer from "multer"
import { ImportSpecificationController } from "../../../../modules/cars/useCases/importSpecification/ImportSpecificationController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const specificationsRoutes = Router()
const upload = multer({ dest:"./tmp/specifications" })

const createSpecificationController = new CreateSpecificationController()
const importSpecificationController = new ImportSpecificationController()
const listSpecificationController = new ListSpecificationController()

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle)
specificationsRoutes.get("/", listSpecificationController.handle )
specificationsRoutes.post("/import", upload.single("file"), ensureAuthenticated, ensureAdmin, importSpecificationController.handle)

export { specificationsRoutes }