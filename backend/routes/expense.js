import { Router } from "express";
import { getExpenseByMonthYear, getMonthlyExpenseByYear } from "../controllers/userController.js";

const expenseRouter = Router();

expenseRouter.get('/', getMonthlyExpenseByYear);
expenseRouter.get('/monthly', getExpenseByMonthYear);

export default expenseRouter;