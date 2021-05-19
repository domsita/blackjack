function Card(props) {
    let symbol = '';
    if (props.suit === 'Diamonds') {
        symbol = '\u2662';
    } else if (props.suit === 'Clubs') {
        symbol = '\u2663';
    } else if (props.suit === 'Hearts') {
        symbol = '\u2661';
    } else {
        symbol = '\u2660'
    }
    return <div className='card'>    
        <h1>{props.value} {symbol}</h1>
    </div>
}

export default Card;