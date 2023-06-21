import { ImportSpecificationUseCase } from "./ImportSpecificationUseCase";
import { Request, Response } from "express"


class ImportSpecificationController{
    constructor( private importSpecificationUseCase: ImportSpecificationUseCase){}

    handle(request: Request, response: Response): Response{
        const { file } = request

        this.importSpecificationUseCase.execute(file)

        return response.sendStatus(201)
    }
}

export { ImportSpecificationController }