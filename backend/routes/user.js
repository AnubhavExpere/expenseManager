import { Router } from "express";
import { getUserDetails } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authenticate.middleware.js";

const userRouter = Router();
userRouter.get('/', verifyToken, getUserDetails);

export default userRouter;