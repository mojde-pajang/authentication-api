import { Request, Response, NextFunction } from "express";

const mongoose = require('mongoose');

interface UserType {
  id ?: String;
  name?: String;
  lastName?: String;
  email : String;
  password : String;
}

const UserSchema = new mongoose.Schema({
    name: { type: String},
    lastName: { type: String },
    age : {type: Number},
    email: { type: String, 
        require:true, 
        unique :true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    password: { type: String, require: true }
  });

  const userModel = mongoose.model('User', UserSchema);

export{ userModel, UserType }