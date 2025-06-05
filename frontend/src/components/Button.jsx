

function Button({icon, text, onClickCallback, bgColor, textColor, border, padding, fontSize}){
    const button = {
        backgroundColor: bgColor, 
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        color: textColor, 
        borderRadius: '5px', 
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        padding: padding ? padding : '7px 10px',
        cursor: 'pointer',
        border: border ? border : 'none',
        fontSize: fontSize ? fontSize : '',

        }
    return (
        <button style={button} className="action-button" onClick={onClickCallback}>
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