import express from "express";
import AuthController from '../controllers/AuthController';

/*Here we are telling our Express application that we want a post request that can handle /register*/
//whenever we get /register it will be handled by AuthController


const router = express.Router();

router.post("/register", AuthController.handleRegister);

export = router;