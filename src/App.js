import './App.css';
import Card from './Card.js';
import drawCard from './DrawCard';
import getDeck from './Deck.js';
import shuffle from './Shuffle';

function App() { 
  let deck = getDeck();
  deck = shuffle(deck);
  let dealerHand = drawCard(deck, 2);
  let hand = drawCard(deck, 2);

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
          <div key={index} className='card-container'>
            <Card value={card.value} suit={card.suit} />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
