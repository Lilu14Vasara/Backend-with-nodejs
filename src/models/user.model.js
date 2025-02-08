import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"//JWTs are commonly used for authentication and authorization in web applications.
import bcrypt from "bcrypt"//It prevents attackers from easily getting the actual password even if they gain access to the database.

//jwt is give token and encoded data
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true//for searching
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,//video file mese ye field leni hai
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String//aces token short live hai refresh token long live hai
        }

    },
    {
        timestamps: true//for update and create
    }
)

userSchema.pre("save", async function (next) {//before code run or save pre run
    if(!this.isModified("password")) return next();//not all time password change when password is modified then only change make
    //next ka acess hona chahiye usse kha jana hai next pta chhalta hai
//not give callback funtion because vo contex provide nhi krta  mtlb this jese keyword ko acess nhi kar skte
    this.password = await bcrypt.hash(this.password, 10)//for encription
    next()//because is a middelware
})

// userSchema.pre("save",async function (next) {
//     if(!this.isModified("password"))  return next();

//     this.password=await bcrypt.hash(this.password,10)
//     next();
// })
// userSchema.method.isPasswordCorrect=async (password)=>{
//    return await bcrypt.compare(password,this.password)
// }

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)//check password compare both password
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,//secret key for acess
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY//expiry time
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(//information refresh token 
    //jwt.sign(payload, secretKey, options);
     //payload means user information return jwt.sign(id:this.id,)
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)

//kuch karne se phele yha hokar jav isko bolte hai middelware
//export const User=mongoose.model("User",userSchema)

//const usermodel=new Schema({})