import './App.css';
import BetButtons from './Bets.js';
import Card from './Card.js';
import { drawCard, getDeck, shuffle } from './Deck.js';
import { useState } from 'react';

function App() { 
  let [dealerHand, setDealerHand] = useState([]);
  let [hand, setHand] = useState([]);
  
  function startGame() {
    let deck = getDeck();
    deck = shuffle(deck);
    dealerHand = setDealerHand(drawCard(deck, 2));
    hand = setHand(drawCard(deck, 2));  
  }

  return (
    <div className="App">
      <div className="dealer-hand">
        <div className="card-container">
          <Card />
        </div>
        <div className="card-container">
          {dealerHand.length ? <Card value={dealerHand[1].value} suit={dealerHand[1].suit} /> : <Card />}
        </div>
      </div>

      <div className="player-hand">
        {hand.length ? hand.map((card, index) => (
          <div key={index} className="card-container">
            <Card value={card.value} suit={card.suit} />
          </div>
        )) : <><Card /><Card /></>}
      </div>
      
      <BetButtons />

    </div>
  );
}

export default App;
