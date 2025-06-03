
export default function CustomizedLegend({payload}){
    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {payload.map( (item, index) => {
                
                const percent = (item.payload.percent * 100).toFixed(1);
                const value=item.payload.value;
                const name=item.payload.name;
                
                return (
                    <li key={`item-${index}`} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                        marginBottom: 8, gap: '100px' }}
                        >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{
                            width: 8, height: 8, backgroundColor: item.color, marginRight: 8, borderRadius: '10px' }} />
                            <span>{`${name}`}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
                            <span style={{color: 'rgb(100, 100, 100)'}}>₹{value}</span>
                            <span>{percent}%</span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}