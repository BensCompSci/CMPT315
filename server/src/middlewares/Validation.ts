import Joi, {ObjectSchema} from 'joi';
import {NextFunction, Response, Request} from 'express';
import {IUser} from '../models/User';


export function ValidateSchema(schema: ObjectSchema){
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(422).json({message: "Object validation failed, please include a valid object"});
        }
    }
}

// DOES THIS MAKE ANY SENSE????
// import { RequestHandler } from 'express';

// export function ValidateSchema(schema: ObjectSchema): RequestHandler {
//     return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             await schema.validateAsync(req.body);
//             return next();
//         } catch (error) {
//             res.status(422).json({ message: "Object validation failed, please include a valid object" });
//         }
//     }
// }

export const Schemas = {
    user:{
        create: Joi.object<IUser>({
            type: Joi.string().valid('ADMIN', 'USER').required(),
            firstName: Joi.string().required(), 
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required()
        })

    }
}   