import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//user model
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["visitor","admin"],
        default:"visitor"
    },
},{
    timestamps:true
});

//middleware that runs before saving the document
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();//prevents re hashing if pw has not changed

    this.password = await bcrypt.hash(this.password,10);//hash the password inorder to avoid storing plane pw in db
    next()
});

//check if entered pw is correct or not 
userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password,this.password) //compares password
}
//method generating accessToken
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({_id:this._id},
    process.env.ACCESS_TOKEN_SECRET,
)}
//method generating refreshToken
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({_id:this._id},
    process.env.REFRESH_TOKEN_SECRET,
)}

// Verify Refresh Token
userSchema.methods.verifyRefreshToken = function (incomingToken) {
  try {
    const decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);

    if (this.refreshToken !== incomingToken) {
      return false; 
    }

    return decoded; 
  } catch (err) {
    return false; 
  }
};
export const User = mongoose.model('User',userSchema)