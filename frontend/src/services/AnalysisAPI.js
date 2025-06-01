import { use } from "react"

const getSpendingDistribution = async (userId) => {
    const reponse = await fetch(`http://localhost:8000/analysis?id=${userId}`);
    const data = await reponse.json();
    return data;
}

export {getSpendingDistribution};