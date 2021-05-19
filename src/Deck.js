const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function getDeck() {
    let deck = new Array();
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {value: values[j], suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

export default getDeck;