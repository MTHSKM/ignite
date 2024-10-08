import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"
import { AppError } from "@shared/errors/AppError"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car", 
            description: "Description Car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        })

        expect(car).toHaveProperty("id")
    })

    it("should not to be able to create a new car with an already exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Car1", 
            description: "Description Car", 
            daily_rate: 100, 
            license_plate: "ABC-1234", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        })
        await expect(

             createCarUseCase.execute({
                name: "Car2", 
                description: "Description Car", 
                daily_rate: 100, 
                license_plate: "ABC-1234", 
                fine_amount: 60, 
                brand: "Brand", 
                category_id: "category"
            })
        ).rejects.toEqual(new AppError("Car already exists!"))
    })

     it("should be able to create a new car with available true by deafault", async () => {
        const car =  await createCarUseCase.execute({
            name: "Car Available", 
            description: "Description Car", 
            daily_rate: 100, 
            license_plate: "ABCD-1234", 
            fine_amount: 60, 
            brand: "Brand", 
            category_id: "category"
        })

        expect(car.available).toBe(true)
    })
})