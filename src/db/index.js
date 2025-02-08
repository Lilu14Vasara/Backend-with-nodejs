import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"


 const connectDB=async()=>{
        try {
              const connectionInstance=await mongoose.connect("mongodb://127.0.0.1:27017/new_project")//for connecting and must use try catch 
             console.log(`\n MongoDb connected Db HOst:`);
             //console.log(`\n MongoDb connected Db HOst:${connectionInstance.connection.host}`);

        }
        catch(error){
            console.log("error",error);
            process.exit()
        }
    }
    export default connectDB