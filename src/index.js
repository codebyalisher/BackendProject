//require('dotenv').config({path:'./env'}) thsi will destroy our consistency approach 
import dbConnect from "./db/index.js";
import dotenv from 'dotenv'
dotenv.config({path:'./env'})



dbConnect()


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