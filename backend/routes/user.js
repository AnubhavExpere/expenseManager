import { Router } from "express";
import { getUserDetails } from "../controllers/userController.js";

const userRouter = Router();
userRouter.get('/', getUserDetails);

export default userRouter;