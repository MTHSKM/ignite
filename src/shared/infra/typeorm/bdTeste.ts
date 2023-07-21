import "reflect-metadata"
import { DataSource } from "typeorm";

const dataSourceTeste = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ignite",
    database: "rentx_test",
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
})

function createConnectionTeste(host = "localhost"):Promise<DataSource>{
    return dataSourceTeste.setOptions({host}).initialize()
}

export { dataSourceTeste, createConnectionTeste }