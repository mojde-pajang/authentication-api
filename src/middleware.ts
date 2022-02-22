import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const CustomError = require('./errorClass');
const bcrypt = require('bcryptjs');

exports.auth_check = ( req:any, res:Response, next:NextFunction ) => {
    try {
        const token =  req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, 'security');
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message : "auth failed"
        })
    }
}

exports.validate_save = async (req:any, res:Response, next:NextFunction ) =>{
console.log(111,req.body.password)
    const hash = await bcrypt.hash(req.body.password, 10 );
    console.log(333,hash)

}

exports.error_handler = (error: Error | InstanceType<typeof CustomError> , req:Request, res:Response, next:NextFunction) => {
    if(error instanceof CustomError ){
        res.status( error?.code ).json({
            message:error.message
        })
        return;
    }
    
    res.status(500).json({
        error:{
            message: error.message
        }
    })
}


