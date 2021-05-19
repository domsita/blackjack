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

export default shuffle;