import express from "express";
import cors from "cors";
import db from "./src/db.js";
import authRouter from "./src/routes/authRouter.js";
import homeRouter from "./src/routes/homeRouter.js";
import cartRouter from "./src/routes/cartRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

export const usersColl = db.collection("users");
export const sessionsColl = db.collection("sessions");
export const prodsColl = db.collection("products");
export const tempCartColl = db.collection("tempcart");
export const cartColl = db.collection("infoscart");

app.use(authRouter);
app.use(homeRouter);
app.use(cartRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
