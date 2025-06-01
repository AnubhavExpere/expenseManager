import { Router } from "express";
import { getMonthlyIncomeByYear } from "../controllers/userController.js";

const incomeRouter = Router();
incomeRouter.get('/', getMonthlyIncomeByYear);

export default incomeRouter;
