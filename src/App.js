import './App.css';
import Card from './Card.js';
import getDeck from './Deck.js';
import shuffle from './Shuffle';

function App() { 
  let deck = getDeck();
  deck = shuffle(deck);

  return (
    <div className="App">
      <header className="App-header">
        {deck.map((card, index) => (
          <div key={index}>
            <Card value={card.value} suit={card.suit} />
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
