import { Router } from "express";
import { loginUser } from "../controllers/userController.js";

const loginRouter = Router();

loginRouter.post('/', loginUser);

export default loginRouter;