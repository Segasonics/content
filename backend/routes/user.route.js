import { Router } from "express";
import { authUser, changePassword, createUser, loginUser, logOutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser)

router.route('/logout').post(protectedRoute,logOutUser)
router.route('/me').get(protectedRoute,authUser);
router.route('/refresh').post(protectedRoute,refreshAccessToken)
router.route('/reset-password').post(protectedRoute,changePassword)

export default router