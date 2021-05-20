function Card(props) {
    let symbol = '';
    let color = 'red';
    if (props.suit === 'Diamonds') {
        symbol = '\u2662';
    } else if (props.suit === 'Clubs') {
        symbol = '\u2663';
        color = 'black';
    } else if (props.suit === 'Hearts') {
        symbol = '\u2661';
    } else if (props.suit === 'Spades') {
        symbol = '\u2660';
        color = 'black';
    } 
    return <div className='card'>    
        <h1 style={{color: color}}>{props.value} {symbol}</h1>
    </div>
}

export default Card;