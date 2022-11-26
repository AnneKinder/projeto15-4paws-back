import express from 'express'
import cors from 'cors'
import db from './src/db.js'
import authRouter from './src/routes/authRouter.js';


const app = express()
app.use(express.json())
app.use(cors())

export const usersColl = db.collection("users");
export const sessionsColl = db.collection("sessions");

app.use(authRouter)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))