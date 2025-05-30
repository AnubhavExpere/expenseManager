export default function GoalProgress({label,  value, maximum, font_Size='15px', font_Color='black'}){
    return (
        <div>
            <label style={{fontSize: font_Size, fontColor: font_Color}}>{label}</label>
            <progress value={value} max={maximum}></progress>
        </div>
    );
}