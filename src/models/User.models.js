import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, //url we will use from any srver thrid party
    required: true,
  },
  converImage: {
    type: String, //url we will use from any srver thrid party
  },
  watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
],
passWord:{
    type:String,
    required:[true,"password id required"]
},
refreshToke:{
    type:String,
}
},{timestamps:true});

userSchema.pre("save",async function (next) {
  if(!this.isModified("password"))return next();
  this.passWord=await bcrypt.hash(this.passWord,10)
  next()
})

userSchema.methods.isPasswordCorrect=async function (passWord) {
  return await bcrypt.compare(passWord,this.passWord)
}

userSchema.methods.generateAceesToken=function(){
  return jwt.sign(
    {
      _id: this._id,
      email: this.eamil,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
}
userSchema.methods.generateFreshToken=function(){
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
}
export const User=mongoose.model("User",userSchema)