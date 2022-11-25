import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

const app = express()
dotenv.config()
app.use(express.json())

const mongoClient = new MongoClient(process.env.MONGO_URI)

try{
    await mongoClient.connect()
}
catch(err){
    console.log(err)
}

let db = mongoClient.db("4paws")

teste



app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))