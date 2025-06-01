import { fetchSpendingDistribution } from "../models/analysisModel.js";

const getSpendingDistribution = async (req, res) => {
    const userId = req.query.id;
    const result = await fetchSpendingDistribution(userId);
    console.log(result);
    res.json(result);
}

export {getSpendingDistribution};