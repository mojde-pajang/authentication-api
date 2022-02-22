import { NextFunction, Request, Response } from "express";
import { userModel , UserType} from "./model";

//Requirements 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('./errorClass');

async function save_data(req: Request, hash: String):Promise<number | Error>{
    
    const newUser = new userModel({
        name : req.body.name || '',
        lastName : req.body.lastName || '',
        email : req.body.email,
        password : hash
    });
    
    try {
        await newUser.save()
        return new Promise<number>(resolve => 200)
    } catch (error) {
         throw error
    }
    
}

exports.signup_route = async ( req:Request, res:Response, next:NextFunction ) => {
    
    const user = await userModel.findOne({email : req.body.email}).exec();
    if( user != null ){
        next(new CustomError(401,"user already exists"))
    }

    const password = req.body.password.length > 4 ? 
    req.body.password : 
    next(new CustomError(401,"choose longer password"));

    bcrypt.hash(password, 10, async function(err: Error, hash: String ) {
        if (err){
          next(err);
        }
        else{
            try {
                
               await save_data(req, hash)

            } catch (error) {

                next(error)
            }
            
        }
    });
    

}

exports.signin_route = async ( req:Request, res:Response, next:NextFunction ) => {
    userModel.findOne({email : req.body.email})
    .exec()
    .then( ( user: UserType ) => {
        if( ! user ){
            return res.status(403).json({
                message: "Wrong enteries"
            })
        }
        bcrypt.compare(req.body.password, user.password ).then(function(result:String) {
           
            if(result){
                const token = jwt.sign(
                    {
                        email: req.body.email
                    }, 
                    'security',
                    {
                        expiresIn : "1h"
                    } );
                res.status(200).json({
                    message : "Signin route",
                    token : token
                });
            }else{
                const error = new Error("Wrong Entries")
                next(error);
            }
        });
    }).catch( (error:Error) => {
        next(error);
       
    })
}

exports.get_all_users = async ( req:Request, res:Response, next:NextFunction ) => {

    userModel.find({}, 'name email').exec()
    .then( ( result:UserType ) =>{
        res.status(200).json({
            message : result
        })
    }).catch((error:Error) => {
        res.status(401).json({
            message : error
        }) 
    })
}

exports.not_found = async (req:Request, res:Response, next:NextFunction) => {
    var err = new Error('URL Not Found');
    next(err);
}
