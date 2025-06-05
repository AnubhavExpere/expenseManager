import axiosInstance from "./axiosInstance";

const getSpendingDistribution = async () => {
    const reponse = await axiosInstance.get(`http://localhost:8000/analysis`);
    const data = await reponse.data;
    return data;
}

export {getSpendingDistribution};