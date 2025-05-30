import { Pie, Cell, PieChart, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import CustomizedLegend from "./CustomizedLegend";

export default function PieChartComponent(){
    const [data, setData] = useState([
        {label:'Dining and Groceries' , value: 800},
        {label:'Transportation' , value: 1400},
        {label:'Rent and Utilities' , value: 3000},
        {label:'Entertainment' , value: 300},
        {label:'Shopping' , value: 500},
        {label:'Sales and Investment' , value: 1100}
    ]);

    const colors = ['#B8EBD0', '#F29E2E', '#07171D', '#DCE1E8', '#BFC7C9', '#127058'];

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