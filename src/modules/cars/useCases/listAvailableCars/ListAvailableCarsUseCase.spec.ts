import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase} from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all avaiable cars", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car1",
            "description": "Car descripion",
            "daily_rate": 110.00,
            "license_plate": "DEF-1234",
            "fine_amount": 40.00,
            "brand": "Car brand",
            "category_id": "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it("should be able to list all avaiable cars by brand", async () => {
        
        const car = await carsRepositoryInMemory.create({
            "name": "Car2",
            "description": "Car descripion",
            "daily_rate": 110.00,
            "license_plate": "DEF-1234",
            "fine_amount": 40.00,
            "brand": "Car_brand_test",
            "category_id": "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        })

        expect(cars).toEqual([car])
    })

    it("should be able to list all avaiable cars by category", async () => {
        
        const car = await carsRepositoryInMemory.create({
            "name": "Car3",
            "description": "Car descripion",
            "daily_rate": 110.00,
            "license_plate": "DEF-1234",
            "fine_amount": 40.00,
            "brand": "Car_brand_test",
            "category_id": "12345"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        })

        expect(cars).toEqual([car])
    })

    it("should be able to list all avaiable cars by name", async () => {
        
        const car = await carsRepositoryInMemory.create({
            "name": "Car4",
            "description": "Car descripion",
            "daily_rate": 110.00,
            "license_plate": "DEF-1234",
            "fine_amount": 40.00,
            "brand": "Car_brand_test",
            "category_id": "category_id"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car4"
        })

        expect(cars).toEqual([car])
    })
})