import React, { useState, useEffect } from 'react';

const Controls = ({ balance, gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent }) => {
    const [amount, setAmount] = useState(10);

    const validation = () => {
        if (amount > balance) {
            return false;
        } else if (amount < .01) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        validation();
    }, [amount, balance])


    const amountChange = (e) => {
        setAmount(e.target.value);
    }

    const onBetClick = () => {
        if (validation()) {
            betEvent(amount);
        }
    }

    const getControls = () => {
        if (!gameState.playerTurn) {
            return (
                <div className='controls-container'>
                    <div className='bet-container'>
                        <h4>Amount:</h4>
                        <input autoFocus type='number' value={amount} onChange={amountChange} className='input' />
                    </div>
                    <button onClick={() => {onBetClick()}} className='btn'>Bet</button>
                </div>
            )
        } else {
            return (
                <div className='controls-container'>
                    <button onClick={() => {hitEvent()}} disabled={buttonState.disableHit} className='btn'>Hit</button>
                    <button onClick={() => {standEvent()}} disabled={buttonState.disableStand} className='btn'>Stand</button>
                    <button onClick={() => {resetEvent()}} disabled={buttonState.disableReset} className='btn'>Reset</button>
                </div>
            )
        }
    }
    return (
        <>{getControls()}</>
    )
}

export default Controls;