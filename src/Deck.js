const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function drawCard(deck, howMany) {
    let hand = [];
    for (let i = 0; i < howMany; i++) {
        hand[i] = deck.shift();
    }
    return hand;
}

function getDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {value: values[j], suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = 0; i < 1000; i++) {
        let position1 = Math.floor((Math.random() * deck.length));
        let position2 = Math.floor((Math.random() * deck.length));
        let temp = deck[position1];

        deck[position1] = deck[position2];
        deck[position2] = temp;
    }
    return deck;
}

export { drawCard, getDeck, shuffle };