
import '../styles/SearchTransactionBar.css'
const SearchTransactionBar = ({value, onChangeCallback}) => {
    return (
        <div className='search-transactions'>
            <img src='assets/search.png' style={{width: '20px', height: '20px'}}/>
            <input type='text' placeholder="Search transactions" value={value} onChange={onChangeCallback} />
        </div>
    )
}

export default SearchTransactionBar;