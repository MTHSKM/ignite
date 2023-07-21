import { app } from "@shared/infra/http/app"
import { createConnectionTeste } from "@shared/infra/typeorm/bdTeste"
import { hash } from "bcryptjs"
import request from "supertest"
import { v4 as uuidV4 } from "uuid"

describe("Create Category Controller", () => {
    beforeEach(async () => {
        const connection = await createConnectionTeste()
        const id = uuidV4()
        const password = await hash("admin", 8)

        await connection.query(
            `
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values ('${id}', 'admin', 'admin@precato.com.br', '${password}', true, 'now()', 'XXXXX')
            `
        )
    })

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions")
        .send({
            email: "admin@precato.com.br",
            password: "admin"
        })

        console.log(responseToken)

        const response = await request(app).post("/categories")
        .send({
            name: "Category SuperTest",
            description: "Category SuperTeste"
        })

        expect(response.status).toBe(201)
    })
})