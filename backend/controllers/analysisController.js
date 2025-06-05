import { fetchSpendingDistribution } from "../models/analysisModel.js";

const getSpendingDistribution = async (req, res) => {
    const userId = req.user.userId;
    const result = await fetchSpendingDistribution(userId);
    res.json(result);
}

export {getSpendingDistribution};