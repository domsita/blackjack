function drawCard(deck, howMany) {
    let hand = [];
    for (let i = 0; i < howMany; i++) {
        hand[i] = deck.shift();
    }
    return hand;
}

export default drawCard;