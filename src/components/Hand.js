import React from 'react';
import Card from './Card';

const Hand = ({ title, cards}) => {
    const getTitle = () => {
        if (cards.length) {
            return (
                <h1 className='title'>{title}</h1>
            )
        }
    }
    return (
        <div className='hand-container'>
            {getTitle()}
            <div className='card-container'>
                {cards.map((card, index) => {
                    return (
                        <Card 
                            key={index} 
                            value={card.value} 
                            suit={card.suit} 
                            hidden={card.hidden}>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}

export default Hand;