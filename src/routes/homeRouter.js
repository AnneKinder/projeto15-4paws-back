import { Router } from "express";
import { home, postNewItem } from "../controllers/homeController.js";
const homeRouter = Router();

homeRouter.get("/home", home);
// homeRouter.post("/home", postTempCart);
homeRouter.post("/home", postNewItem)



export default homeRouter;
