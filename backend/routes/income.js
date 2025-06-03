import { Router } from "express";
import { getIncomeByMonthYear, getMonthlyIncomeByYear } from "../controllers/userController.js";

const incomeRouter = Router();
incomeRouter.get('/', getMonthlyIncomeByYear);
incomeRouter.get('/monthly', getIncomeByMonthYear);

export default incomeRouter;
