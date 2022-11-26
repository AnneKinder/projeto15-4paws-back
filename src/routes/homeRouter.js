import { Router } from "express";
import { home } from "../controllers/homeController.js";
const homeRouter = Router();

homeRouter.get("/home", home);


export default homeRouter;
