import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from "fs";
import csvParser from "csv-parser"
import { inject,injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor ( @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository ){}

    loadCategories( file: Express.Multer.File ): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path, "utf8")
            const categories: IImportCategory[] = []
        
            const parseFile = csvParser()
        
            stream.pipe(parseFile)
        
            parseFile.on("data", async (line) => {
                const trimmedDescription = line['description'].trim();
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
        
        categories.map(async (category) => {
            const { name, description } = category
            const existCategory = await this.categoriesRepository.findByName(name)

            if(!existCategory){
                await this.categoriesRepository.create({
                    name,
                    description,
                })
            }
        })
    }
}

export { ImportCategoryUseCase }