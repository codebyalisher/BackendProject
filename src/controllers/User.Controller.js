import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
import UploadOnCloudNary from "../utils/CloudNary.js"
import ApiResponse from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  if (
    // throw new ApiError(400,"Full Name is required") or
    [fullname, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are compulsory");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (!existedUser) {
    throw new ApiError(400, "User with this email existed");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //console.log(avatarLocalPath)
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
    if (coverImageLocalPath) {
      throw new ApiError(400, "Cover Image is required");
    }

    const avatar=await UploadOnCloudNary(avatarLocalPath)
    const coverImage= await UploadOnCloudNary(coverImageLocalPath)
      if (!avatar) {
        throw new ApiError(400, "Avatar file is not uploaded");
      }

      const User=await User.create({
        fullname,
        email,
        username:username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || null,
      })
      const createdUser = await User.findById(User._id).select(
        "-password  -refreshToke"
      );
      if(!createdUser){throw new ApiError(500,"Something went wrong while creating the user")}

      return res.status(201).json(new ApiResponse(200,createdUser,"user registered successfully"))
});

export default registerUser;
