import { Router } from "express";
import { getIncomeByMonthYear, getMonthlyIncomeByYear } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authenticate.middleware.js";

const incomeRouter = Router();
incomeRouter.get('/', verifyToken, getMonthlyIncomeByYear);
incomeRouter.get('/monthly', verifyToken, getIncomeByMonthYear);

export default incomeRouter;
