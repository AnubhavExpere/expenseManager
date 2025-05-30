

function Button({icon, text, onClick, bgColor, textColor}){
    const button = {
        backgroundColor: bgColor, 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        color: textColor, 
        border: 'none',
        borderRadius: '5px', 
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '7px 10px',
        cursor: 'pointer',
        }
    return (
        <button style={button} className="action-button">
            {icon && <img src={icon} alt="icon" className="button-icon" style={styles.icon}/>}
            {text}
        </button>
    )
}

const styles = {
    hover: {
        cursor: 'pointer',
    },
    icon: {
        width: '15px',
        marginRight: '8px'
    }
}

export default Button;