import { Request, Response } from "express";
import {register} from '../services/UserService';
import {IUser} from '../models/User';

async function handleRegister(req:Request, res:Response){
    const user:IUser = req.body;

    try {
        const registeredUser = await register(user);

        //get successful code when user is created and put info into json
        res.status(201).json({
            message: "User successfully created",
            //this user does not contain password
            user: {
                _id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email

            }
        });
    } catch (error:any) {
        //default code for sevrer error
        res.status(500).json({message: "Unable to register user at this time", error:error.message});
    }
}
export default {handleRegister};