import { Router } from "express";
import { getSpendingDistribution } from "../controllers/analysisController.js";

const analysisRouter = Router();
analysisRouter.get('/', getSpendingDistribution);

export default analysisRouter;