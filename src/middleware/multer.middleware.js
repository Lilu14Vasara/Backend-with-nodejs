import multer from "multer";

//diskStorage is a Multer storage engine that allows you to store uploaded files on the server's 
//local disk instead of cloud storage like Cloudinary or AWS S3.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")//call  back where to store file
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)//orignal name
    }
  })
  
export const upload = multer({ 
    storage, 
})

//Middleware is a function that sits between an
// incoming request and the final response in a Node.js application (typically using Express.js). 
//It processes requests, modifies responses, and controls the flow of the application.

//1xx - information
//2xx-success
//3xx-redirection
//4xx-client error
//5xx -server error
