import './App.css';
import Card from './Card.js';
import { drawCard, getDeck, shuffle } from './Deck.js';
import { useState } from 'react';

function App() { 
  let deck = getDeck();
  deck = shuffle(deck);
  let dealerHand = drawCard(deck, 2);
  let hand = drawCard(deck, 2);

  let [money, setMoney] = useState(500);
  function bet5() {
    setMoney(money - 5);
  }

  function bet25() {
    setMoney(money - 25);
  }

  function bet100() {
    setMoney(money - 100);
  }

  return (
    <div className="App">
      <div className="dealer-hand">
        <div className="card-container">
          <Card />
        </div>
        <div className="card-container">
          <Card value={dealerHand[1].value} suit={dealerHand[1].suit} />
        </div>
      </div>

      <div className="player-hand">
        {hand.map((card, index) => (
          <div key={index} className="card-container">
            <Card value={card.value} suit={card.suit} />
          </div>
        ))}
      </div>
      
      <div className="cash-container">
        <h3>Chips: {money}</h3>
      </div>

      <div className="bet-buttons">
        <button className="btn" onClick={bet5}>Bet 5</button>
        <button className="btn" onClick={bet25}>Bet 25</button>
        <button className="btn" onClick={bet100}>Bet 100</button>
      </div>

    </div>
  );
}

export default App;
