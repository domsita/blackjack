import { useState } from 'react';

function BetButtons() {
    let [money, setMoney] = useState(500);
    let [gameActive, setGameActive] = useState(false);
    let [bet, setBet] = useState(0);

    function bet5() {
        setMoney(money - 5);
        setBet(5);
        setGameActive(true);
    }

    function bet25() {
        setMoney(money - 25);
        setBet(25);
        setGameActive(true);
    }
    
    function bet100() {
        setMoney(money - 100);
        setBet(100);
        setGameActive(true);
    }

    return (
        <div>
            <div className="cash-container">
                <h3>Chips: {money}</h3>
            </div>
            {!gameActive ? <div className="bet-buttons">
                <button className="btn" onClick={bet5}>Bet 5</button>
                <button className="btn" onClick={bet25}>Bet 25</button>
                <button className="btn" onClick={bet100}>Bet 100</button>
            </div> : <></>}
        </div>
    )
}

export default BetButtons;