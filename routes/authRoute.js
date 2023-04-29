import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { testController, registerController, loginController } from "../controllers/authController.js";
//router object
const router = express.Router();

// routing
// register || method post
router.post('/register', registerController);

//login || post
router.post('/login', loginController);

//test route
router.get('/test', requireSignIn, isAdmin, testController);


export default router;