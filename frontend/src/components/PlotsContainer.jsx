import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";

function PlotsContainer(){
    return (
        <div className='plot-container'>
            <div className="bar-plot-container">
                <h1>Monthly Income vs Expenses</h1>
                <BarChartComponent />
            </div>
            <div className="pie-chart-container">
                <h1>Spending Distribution</h1>
                <PieChartComponent/>
            </div>
        </div>
    )
}

export default PlotsContainer;