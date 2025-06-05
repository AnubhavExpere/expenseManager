import { Pie, Cell, PieChart, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import CustomizedLegend from "./CustomizedLegend";
import { getSpendingDistribution } from "../services/AnalysisAPI";

export default function PieChartComponent(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        const loadSpendingDistr = async () => {
            try {
                let result = await getSpendingDistribution();
                result = await result.map( obj => ({label: String(obj.category), value: parseFloat(obj.total_amount)}) )
                setData(result);
            } catch (err) {
                console.log('Failed to spending distribution. \n', err);
            }
        }
        loadSpendingDistr();
    }, [])

    const colors = ['#F29E2E', '#127058', '#BFC7C9', '#DCE1E8', '#07171D', '#B8EBD0'];

    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{top: 10, bottom: 10, right: 10}}>
                <Pie data={data} dataKey='value' nameKey='label' cx="50%" cy="50%" fill="#8884d8" innerRadius={40} stroke="none"
                    padding={0}>
                    {data.map((entry,index) => (
                        <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
                    ))}    
                </Pie> 
                <Tooltip />
                <Legend content={(props) => <CustomizedLegend {...props}/>} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
        </ResponsiveContainer>
    );
}


// [
//         {label:'Dining and Groceries' , value: 800},
//         {label:'Transportation' , value: 1400},
//         {label:'Rent and Utilities' , value: 3000},
//         {label:'Entertainment' , value: 300},
//         {label:'Shopping' , value: 500},
//         {label:'Sales and Investment' , value: 1100}
//     ]