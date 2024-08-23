import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.models.js";
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
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
    if (coverImageLocalPath) {
      throw new ApiError(400, "Cover Image is required");
    }
});

export default registerUser;
