import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from "../models/user.model.js";

//functions to generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        let user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        await user.save({ validateBeforeSave: false });
        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh Token")
    }
}

//create user controller
export const createUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if any fields is empty after trimming spaces
    if ([email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(401, "user already exist")
    }

    const user = await User.create({
        email,
        password
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);

    const findUser = await User.findById(user._id).select("-password -refreshToken")

    if (!findUser) {
        throw new ApiError(500, "Sorry! something went wrong while registering")
    }

    const options = {
        httpOnly: true, //prevent XSS attacks-cross site scripting attack
        secure: true,
        sameSite: 'none'//prevents CSRF attacks, cross-site request forgery
    }


    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200,findUser,"User created successfully"))
});

//login user controller
export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if([email,password].some((field)=>field.trim()==="")){
        throw new ApiError(400,"All fields are required")
    };

    const user = await User.findOne({email});
    if(!user){
      throw new ApiError(400,"User does not exist")
    }

    const isValidPassword = await user.isCorrectPassword(password);
    if(!isValidPassword){
        throw new ApiError(401,"Invalid user credentials")
    };

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
        httpOnly: true, //prevent XSS attacks-cross site scripting attack
        secure: true,
        sameSite: 'none'//prevents CSRF attacks, cross-site request forgery
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{
        user:loggedInUser,accessToken,refreshToken
    },"User logged In successfully"))
})

//logout user controller
export const logOutUser=asyncHandler(async(req,res)=>{
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },{
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true,
         sameSite: 'none'
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out succeffuly"))
});

export const authUser = asyncHandler(async(req,res)=>{
    const user = req.user;
    if(!user){
        throw new ApiError(401,"Unauthorized")
    }
     
    return res.status(200)
    .json(new ApiResponse(200,user,"authenticated"))
})