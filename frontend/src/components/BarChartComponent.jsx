// BarChartComponent.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Label} from 'recharts';

/* Need to use some other charts library, may be Chartjs */

export default function BarChartComponent() {
  const [data, setData] = useState([
    { "label": "Jan", "income": 400, "expense": 200},
    { "label": "Feb", "income": 300, "expense": 200},
    { "label": "Mar", "income": 500, "expense": 200},
    { "label": "Apr", "income": 400, "expense": 200},
    { "label": "May", "income": 700, "expense": 200},
    { "label": "Jun", "income": 800, "expense": 200},
    { "label": "Jul", "income": 300, "expense": 200},
    { "label": "Aug", "income": 550, "expense": 200},
    { "label": "Sep", "income": 750, "expense": 200},
    { "label": "Oct", "income": 900, "expense": 200},
    { "label": "Nov", "income": 960, "expense": 200},
    { "label": "Dec", "income": 470, "expense": 200}
  ]);

//   useEffect(() => {
//     // Fetch data from backend API
//     fetch('/api/data') // replace with your actual backend route
//       .then(res => res.json())
//       .then(json => setData(json))
//       .catch(err => console.error("Error loading data:", err));
//   }, []);

  return (
    <ResponsiveContainer width='100%' height={200} style={{padding:'0px'}}>
      <BarChart data={data} barCategoryGap="10%" width='100%' margin={{bottom: 20, left: 10, right: 10}}>
        <CartesianGrid vertical={false} stroke='#c5c5c5' strokeDasharray="0" />
        <XAxis tickLine={false} axisLine={false} dataKey="label" tick={{fontSize: '12px'}}>  
          <Label value="Month" offset={0} position="bottom" style={{fontSize: '15px'}} />
        </XAxis>
        <YAxis tickLine={false} axisLine={false} tick={{fontSize: '12px'}}>
          <Label angle={-90} value='Amount in ₹' offset={0} position='left' style={{textAnchor: 'middle', fontSize: '14px'}}/>
        </YAxis>
        <Tooltip />
        <Bar dataKey="income" fill="#646a68" radius={[5, 5, 0, 0]} />
        <Bar dataKey="expense" fill="c5c5c5" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
