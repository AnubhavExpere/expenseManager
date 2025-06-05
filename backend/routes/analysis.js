import { Router } from "express";
import { getSpendingDistribution } from "../controllers/analysisController.js";
import { verifyToken } from "../middlewares/authenticate.middleware.js";

const analysisRouter = Router();
analysisRouter.get('/', verifyToken, getSpendingDistribution);

export default analysisRouter;