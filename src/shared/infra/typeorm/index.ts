import "reflect-metadata"
import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ignite",
    database: "postgres",
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
})

function createConnection(host = "localhost"):Promise<DataSource>{
    return dataSource.setOptions({host}).initialize()
}

export { dataSource, createConnection }