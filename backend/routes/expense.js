import { Router } from "express";
import { getExpenseByMonthYear, getMonthlyExpenseByYear } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authenticate.middleware.js";

const expenseRouter = Router();

expenseRouter.get('/', verifyToken, getMonthlyExpenseByYear);
expenseRouter.get('/monthly', verifyToken, getExpenseByMonthYear);

export default expenseRouter;