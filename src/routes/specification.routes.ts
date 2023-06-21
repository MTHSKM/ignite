import { Router } from "express"
import { createSpecificationController } from "../modules/cars/useCases/createSpecification"
import { listSpecificationController } from "../modules/cars/useCases/listSpecifications"
import multer from "multer"
import { importSpecificationController } from "../modules/cars/useCases/importSpecification"

const specificationsRoutes = Router()
const upload = multer({ dest:"./tmp2" })

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response)
})

specificationsRoutes.get("/", (request,response) => {
    return listSpecificationController.handle(request, response)
})

specificationsRoutes.post("/import", upload.single("file"), (request, response) => {
    return importSpecificationController.handle(request, response)
})

export { specificationsRoutes }