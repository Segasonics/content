import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { User } from "../models/user.model.js";

// Cookie options
const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000 // 15 minutes
};

const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};


//functions to generate access and refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        let user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken= refreshToken

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

    return res.status(201)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(new ApiResponse(200, findUser, "User created successfully"));

});

//login user controller
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    };

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User does not exist")
    }

    const isValidPassword = await user.isCorrectPassword(password);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid user credentials")
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    return res.status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(new ApiResponse(200, { user: loggedInUser }, "User logged in successfully"));

})

//logout user controller
export const logOutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )

    return res.status(200)
        .clearCookie("accessToken", accessTokenOptions)
        .clearCookie("refreshToken", refreshTokenOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));

});

export const authUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized")
    }

    return res.status(200)
        .json(new ApiResponse(200, user, "authenticated"))
})


export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incoming = req.cookies?.refreshToken;
  if (!incoming) throw new ApiError(401, "No refresh token");

  // find user by stored refresh token
  const user = await User.findOne({ refreshToken: incoming });
  if (!user) throw new ApiError(403, "Invalid refresh token");

  const ok = user.verifyRefreshToken(incoming);
  if (!ok) throw new ApiError(403, "Expired or invalid refresh token");

  // rotate tokens
  const {accessToken,refreshToken}= generateAccessAndRefreshToken()

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, {}, "Access token refreshed"));
});
