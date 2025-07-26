import { Router } from "express";
import { authUser, createUser, loginUser, logOutUser } from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser)

router.route('/logout').post(protectedRoute,logOutUser)
router.route('/me').get(protectedRoute,authUser)

export default router