import { Router } from "express";
//multer middleware
import upload from "../middlewares/multer.js";
import { registerUser } from "../controllers/userController.js";

const registerRouter = Router();
  
registerRouter.post('/', upload.single('profile_photo'), registerUser);

export default registerRouter;