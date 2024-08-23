//require('dotenv').config({path:'./env'}) thsi will destroy our consistency approach 
import app from "./app.js";
import dbConnect from "./db/index.js";
import dotenv from 'dotenv'
dotenv.config({path:'../.env'})



dbConnect()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening on ${process.env.PORT || 8000}`)
    })
})
.catch((error)=>{
    console.log("monogdb connection failed !!!",error)
})


/*import mongoose from "mongoose"
import {DB_NAME} from "./constants"
import express from "express"
const app=express()
;(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("Error",()=>{
        console.log("connection is not established")
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`app is listending on ${process.env.PORT}`)
       })
    } catch (error) {
        console.error(error)
    }
})()//this is the ife mean immedaiately executeable fucntion,nd also we use the semicolon at the start if is miss at the import
*/