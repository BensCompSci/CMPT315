"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
/*Here we are telling our Express application that we want a post request that can handle /register*/
//whenever we get /register it will be handled by AuthController
const router = express_1.default.Router();
router.post("/register", AuthController_1.default.handleRegister);
module.exports = router;
