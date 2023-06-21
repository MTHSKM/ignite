import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from "fs";
import csvParser from "csv-parser"

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor ( private categoriesRepository: ICategoriesRepository ){}

    loadCategories( file: Express.Multer.File ): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path, "utf8")
            const categories: IImportCategory[] = []
        
            const parseFile = csvParser()
        
            stream.pipe(parseFile)
        
            parseFile.on("data", async (line) => {
                const trimmedDescription = line[' description'].trim();
                const modifiedLine = {
                    name: line.name,
                    description: trimmedDescription
                };
                categories.push(modifiedLine)
            }).on("end", () => {
                fs.promises.unlink(file.path)
                resolve(categories)
            }).on("error", (err) => {
                reject(err)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file)
        console.log(categories)
    }
}

export { ImportCategoryUseCase }