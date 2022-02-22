import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            userData?: Record<User>
        }
        interface CustomError {
            code : number
            message : string
        }

    }
}