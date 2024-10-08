import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { Request, Response } from "express"
import { container } from "tsyringe";

class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        await importCategoryUseCase.execute(file)

        return response.sendStatus(201)
    }
}

export { ImportCategoryController }