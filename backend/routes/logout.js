import { Router } from "express";
import { verifyToken } from '../middlewares/authenticate.middleware.js'
import { logoutUser } from "../controllers/userController.js";

const logoutRouter = Router();
logoutRouter.post('/', verifyToken, logoutUser);

export default logoutRouter;