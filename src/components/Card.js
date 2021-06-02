import React from 'react';

const Card = ({ value, suit, hidden }) => {
    const getCard = () => {
        if (hidden) {
            return (
                <div className='hidden-card' />
            );
        } else {
            return (
                <div className={(suit === '\u2663' || suit === '\u2660') ? "black-card" : "red-card"}>
                    <h1 className='value'>{value}</h1>
                    <h1 className='suit'>{suit}</h1>
                </div>
            )
        }
    }
    return (
        <>{getCard()}</>
    )
}

export default Card;