import { Request, Response } from "express"
import { container } from "tsyringe"

import { UploadCarImagesUseCase } from "./UploadCarImagseUseCase"

interface IFiles {
    filename: string
}

class UploadCarImagesController {
    async handle( request: Request, response: Response ): Promise<Response>{
        const { id } = request.params
        const images = request.files as IFiles[]
        
        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)

        const images_name = images.map((file) => file.filename)

        await uploadCarImagesUseCase.execute({
            car_id: id,
            images_name
        })

        return response.sendStatus(201)
    }
}

export { UploadCarImagesController }