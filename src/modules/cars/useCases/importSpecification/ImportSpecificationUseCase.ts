import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import fs from "fs"
import csvParse from "csv-parser"

interface IImportSpecification {
    name: string;
    description: string;
}

class ImportSpecificationUseCase {
    constructor ( private specificationRepository: ISpecificationRepository ){}

    
    loadSpecification(file: Express.Multer.File){
        return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(file.path, "utf8")
        const specification: IImportSpecification[] = []
        
        const parseFile = csvParse()

        stream.pipe(parseFile)

        parseFile.on("data", async (line) => {
            const trimmedDescription = line[' description'].trim();
            const modifiedLine = {
                name: line.name,
                description: trimmedDescription
            };
            specification.push(modifiedLine)
        }).on("end", () => {
            fs.promises.unlink(file.path)
            resolve(specification)
        }).on("error", (err) => {
            reject(err)
        })
        })
    }

    async execute(file:Express.Multer.File): Promise<void>{
        const specification = await this.loadSpecification(file)
        console.log(specification)
    }
}

export { ImportSpecificationUseCase }