import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { AppError } from "@shared/errors/AppError"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
    })

    it("should not to be able to add a new specification to a non-existent car", async () => {
        const car_id = "1234"
        const specifications_id = ["543321"]
        await expect(
            createCarSpecificationUseCase.execute({ car_id, specifications_id })
        ).rejects.toEqual(new AppError("Car does not exists!"))
    })

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test",
        })

        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1)
    })
})