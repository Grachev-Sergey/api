import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "root",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
});

