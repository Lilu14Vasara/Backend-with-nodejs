// import express from "express"
// import cors from "cors" //CORS is a middleware that allows your server to handle requests from different origins (domains)
// import cookieParser from "cookie-parser"//cookie-parser is a middleware that parses cookies attached to client requests.
// //It makes it easy to access and manipulate cookies in Node.js.
// //(err,req,res,next)->middelware

// //middelware is used to check permission or othr thing likr this
// const app=express()
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))

// app.use(express.json({limit:"16kb"}))//for taking data
// app.use(express.urlencoded({extended:true,limit:"16kb"}))//extended for objecct inside object

// app.use(express.static("public"))// for public file
// app.use(cookieParser())

// export {app}

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration 
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }