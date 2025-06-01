function CashFlowBox({title,amount,src,change,increased}) {     
    const trendCurve = increased=='1' ? 'assets/uparrow.png' : 'assets/downarrow.png';
    const textColor= increased=='1' ? 'green':'red';
    return (
        <div className="cash-flow-container">
            <div className='cash-flow-header'>
                <h4>{title}</h4>
                <img src='assets/more.png' className='more-button' />
            </div>
            <h2 >₹{amount}</h2>
            <div className='percentage-change'>
                <img style={{width: '20px', height: '20px'}} src={trendCurve} />
                <span style={{color: textColor, }}>{change}%</span> 
                <span>&nbsp;vs last month</span>
            </div>
            <div className='trend-curve'>
                <img src={src} style={{height: '90px', width: '110px'}}/>
            </div>
        </div>
    )
}

export default CashFlowBox;