import React, { useEffect, useContext, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Label} from 'recharts';
import { UserContext } from '../context/User';
import { getMonthlyExpenseByYear, getMonthlyIncomeByYear } from '../services/UserAPI';

/* Need to use some other charts library, may be Chartjs */

const DATE = new Date();

export default function BarChartComponent() {
  const [data, setData] = useState([]);

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const userId = useContext(UserContext).userId;
  const year = DATE.getFullYear();

  useEffect(() => {
    const loadMonthlyData = async () => {
      const incomeData = await getMonthlyIncomeByYear(userId, year);
      const expenseData = await getMonthlyExpenseByYear(userId, year);

      const monthlyData = MONTHS.map((label, index) => {
        const incomeObj = incomeData.find(item => parseInt(item.month) === index + 1);
        const expenseObj = expenseData.find(item => parseInt(item.month) === index + 1);

        return {
          label,
          income: incomeObj ? parseFloat(incomeObj.income) : 0,
          expense: expenseObj ? parseFloat(expenseObj.expense) : 0,
        };
      }); 

      setData(monthlyData);
    }
    loadMonthlyData();
  }, []);

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
        <Tooltip formatter={(value => (isNaN(value) ? 0: value))} />
        <Bar dataKey="income" fill="#646a68" radius={[5, 5, 0, 0]} />
        <Bar dataKey="expense" fill="c5c5c5" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}