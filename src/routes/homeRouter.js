import { Router } from "express";
import { home, postTempCart } from "../controllers/homeController.js";

const homeRouter = Router();

homeRouter.get("/home", home);
homeRouter.post("/home", postTempCart);

export default homeRouter;
