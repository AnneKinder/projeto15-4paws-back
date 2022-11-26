import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import {
  signInValidationMiddleware,
  signUpValidationMiddleware,
} from "../middlewares/SchemaValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpValidationMiddleware, signUp);
authRouter.post("/", signInValidationMiddleware, signIn);

export default authRouter;
