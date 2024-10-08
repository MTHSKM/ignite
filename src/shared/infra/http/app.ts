import express, { NextFunction, Request, Response } from 'express';
import "express-async-error"

import "reflect-metadata"
import swaggerUi from "swagger-ui-express"

import { router } from './routes';
import { dataSource, createConnection } from "@shared/infra/typeorm"
import swaggerFile from "../../../swagger.json"
import "../../container"
import { AppError } from '../../errors/AppError';

createConnection('localhost')

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

export { app }