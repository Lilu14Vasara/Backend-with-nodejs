//require ('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
//import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";


dotenv.config({
    path:'./env'
})

connectDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is started at port : ${process.env.PORT}`);
    })
}).catch((err)=>{console.log("Mongodb connect error");})



// import express from "express";
// const app=express()

// // function connectDB(){}
// // connectDB()
// //; use for cleaning purpose
// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)//for connecting and must use try catch 
//         app.on("error",(error)=>{
//             console.log("ERRR" ,error);
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening on port ${process.env.PORT}`);
//         })
   
//     } catch (error) {
//         console.log("ERROR:",error);
//     }
// })()//direct call funtion aur execute the function