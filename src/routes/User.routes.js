import { Router } from "express";
import registerUser from "../controllers/User.Controller.js";
import {upload} from "../middlwares/Multer.middlwares.js"
const router=Router()
router.route("/register").post(registerUser,upload.fields([
    {name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]))
//router.route("/login").post(loginUser)

export default router