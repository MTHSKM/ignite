/*
import { app } from "@shared/infra/http/app"
import { createConnectionTeste, dataSourceTeste } from "@shared/infra/typeorm/bdTeste"
import { hash } from "bcryptjs"
import request from "supertest"
import { v4 as uuidV4 } from "uuid"

describe("Create Category Controller", () => {
    beforeAll(async () => {
        const connection = await createConnectionTeste()
        await connection.runMigrations()

        const id = uuidV4()
        const password = await hash("admin", 8)

        await connection.query(
            `
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values ('${id}', 'admin', 'admin@precato.com.br', '${password}', true, 'now()', 'XXXXX')
            `
        )
    })

    afterAll(async() => {
        const connection = await createConnectionTeste()

    })

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@precato.com.br", password: "admin"
        })

        const { token } = responseToken.body

        const response = await request(dataSourceTeste).post("/categories").send({
            name: "Category SuperTest",
            description: "Category SuperTeste"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201)
    })

    it("should not to be able to create a new category with name exists", async () => {
        const responseToken = await request(dataSourceTeste).post("/sessions").send({
            email: "admin@precato.com.br", password: "admin"
        })

        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category SuperTeste"
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400)
    })
})
*/