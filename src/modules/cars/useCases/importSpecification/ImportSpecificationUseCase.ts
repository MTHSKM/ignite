import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";
import fs from "fs"
import csvParse from "csv-parser"
import { inject, injectable } from "tsyringe";

interface IImportSpecification {
    name: string;
    description: string;
}

@injectable()
class ImportSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationRepository) { }


    loadSpecification(file: Express.Multer.File): Promise<IImportSpecification[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path, "utf8")
            const specifications: IImportSpecification[] = []

            const parseFile = csvParse()

            stream.pipe(parseFile)

            parseFile.on("data", async (line) => {
                const trimmedDescription = line[' description'].trim();
                const modifiedLine = {
                    name: line.name,
                    description: trimmedDescription
                };
                specifications.push(modifiedLine)
            }).on("end", () => {
                fs.promises.unlink(file.path)
                resolve(specifications)
            }).on("error", (err) => {
                reject(err)
            })
        })
    }



    async execute(file: Express.Multer.File): Promise<void> {
        const specifications = await this.loadSpecification(file)
        console.log(specifications)

        specifications.map(async (specification) => {
            const { name, description } = specification
            const existSpecification = this.specificationRepository.findByName(name)

            if (!existSpecification) {
                await this.specificationRepository.create({ name, description })
            }
        })
    }
}

export { ImportSpecificationUseCase }   