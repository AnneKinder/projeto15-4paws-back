import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController.js";
import {
  signInValidationMiddleware,
  signUpValidationMiddleware,
} from "../middlewares/SchemaValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpValidationMiddleware, signUp);
authRouter.post("/", signInValidationMiddleware, signIn);
authRouter.delete("/sign-out", signOut);

export default authRouter;
