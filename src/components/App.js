// help from https://github.com/jarodburchill/blackjack-react-app

import React, { useState, useEffect } from 'react';
import Status from './Status';
import Controls from './Controls';
import Hand from './Hand';

import jsonDeck from '../deck.json';

const App = () => {

    const Message = {
        bet: "Place a bet",
        hitOrStand: "Hit or Stand?",
        bust: "Bust...",
        playerWin: "You Win!",
        dealerWin: "Dealer Wins!",
        push: "Push!",
    }

    const data = JSON.parse(JSON.stringify(jsonDeck.cards));
    const [deck, setDeck] = useState(data);

    const [playerCards, setPlayerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerCount, setPlayerCount] = useState(0);

    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerCount, setDealerCount] = useState(0);

    const [balance, setBalance] = useState(1000);
    const [bet, setBet] = useState(0);

    const [gameState, setGameState] = useState({
        bet: false,
        init: false,
        playerTurn: false,
        dealerTurn: false,
    });
    const [message, setMessage] = useState(Message.bet);
    const [buttonState, setButtonState] = useState({
        disableHit: false,
        disableStand: false,
        disableReset: true,
    });

    useEffect(() => {
        if (gameState.init) {
            drawCard("player");
            drawCard("hidden");
            drawCard("player");
            drawCard("dealer");
            setGameState({...gameState, init: false, playerTurn: true});
            setMessage(Message.hitOrStand);
        }
    }, [gameState]);

    useEffect(() => {
        calculate(playerCards, setPlayerScore);
        setPlayerCount(playerCount + 1);
    }, [playerCards]);

    useEffect(() => {
        calculate(dealerCards, setDealerScore);
        setDealerCount(dealerCount + 1);
    }, [dealerCards])

    useEffect(() => {
        if (gameState.playerTurn) {
            if (playerScore === 21) {
                setButtonState({...buttonState, disableHit: true});
            } else if (playerScore > 21) {
                bust();
            }
        }
    }, [playerCount]);

    useEffect(() => {
        if (gameState.dealerTurn) {
            if (dealerScore >= 17) {
                checkWin();
            } else {
                drawCard("dealer");
            }
        }
    }, [dealerCount]);

    const resetGame = () => {
        console.clear();
        setDeck(data);

        setPlayerCards([]);
        setPlayerScore(0);
        setPlayerCount(0);

        setDealerCards([]);
        setDealerScore(0);
        setDealerCount(0);

        setBet(0);

        setGameState({...gameState, init: false, bet: false, playerTurn: false, dealerTurn: false});
        setMessage(Message.bet);
        setButtonState({
            disableHit: false,
            disableStand: false,
            disableReset: true,
        });
    }

    const placeBet = (amount) => {
        resetGame();
        setBet(amount);
        setBalance(balance - amount);
        setGameState({...gameState, init: true, bet: true, playerTurn: false, dealerTurn: false});
    }

    const drawCard = (dealType) => {
        if (deck.length) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const card = deck[randomIndex];
            deck.splice(randomIndex, 1);
            setDeck([...deck]);
            console.log('Remaining Cards: ', deck.length);
            switch (card.suit) {
                case 'spades':
                    dealCard(dealType, card.value, '\u2660');
                    break;
                case 'diamonds':
                    dealCard(dealType, card.value, '\u2662');
                    break;
                case 'clubs':
                    dealCard(dealType, card.value, '\u2663');
                    break;
                case 'hearts':
                    dealCard(dealType, card.value, '\u2661');
                    break;
                default:
                    break;
            }
        } else {
            alert('All cards have been drawn');
        }
    }

    const dealCard = (dealType, value, suit) => {
        switch (dealType) {
            case "player":
                playerCards.push({ 'value': value, 'suit': suit, 'hidden': false});
                setPlayerCards([...playerCards]);
                break;
            case "dealer":
                dealerCards.push({ 'value': value, 'suit': suit, 'hidden': false});
                setDealerCards([...dealerCards]);
                break;
            case "hidden":
                dealerCards.push({ 'value': value, 'suit': suit, 'hidden': true});
                setDealerCards([...dealerCards]);
                break;
            default:
                break;
        }
    }

    const revealCard = () => {
        dealerCards.filter((card) => {
            if (card.hidden) {
                card.hidden = false;
            }
            return card;
        });
        setDealerCards([...dealerCards]);
    }

    const calculate = (cards, setScore) => {
        let total = 0;
        cards.forEach((card) => {
            if (!card.hidden && card.value !== 'A') {
                switch (card.value) {
                    case 'K':
                        total += 10;
                        break;
                    case 'Q':
                        total += 10;
                        break;
                    case 'J':
                        total += 10;
                        break;
                    default:
                        total += parseInt(card.value);
                        break;
                }
            }
        });
        const aces = cards.filter((card) => {
            return card.value === 'A';
        });
        aces.forEach((card) => {
            if (!card.hidden) {
                if ((total + 11) > 21) {
                    total += 1;
                } else if ((total + 11) === 21) {
                    if (aces.length > 1) {
                        total+=1;
                    } else {
                        total += 11;
                    }
                } else {
                    total += 11;
                }
            }
        });
        setScore(total);
    }

    const hit = () => {
        drawCard("player");
    }

    const stand = () => {
        buttonState.disableHit = true;
        buttonState.disableStand = true;
        buttonState.disableReset = false;
        setButtonState({...buttonState});
        setGameState({...gameState, dealerTurn: true, playerTurn: false});
        revealCard();
    }

    const bust = () => {
        buttonState.disableHit = true;
        buttonState.disableStand = true;
        buttonState.disableReset = false;
        setButtonState({...buttonState});
        setMessage(Message.bust);
        setGameState({...gameState, dealerTurn: false, playerTurn: false});
    }

    const checkWin = () => {
        if (playerScore === 21 && playerCards.length === 2) {
            setBalance(balance + (bet * 2.5));
            setMessage(Message.playerWin);
        } else if (playerScore > dealerScore || dealerScore > 21) {
            setBalance(balance + (bet * 2));
            setMessage(Message.playerWin);
        } else if (dealerScore > playerScore) {
            setMessage(Message.dealerWin);
        } else {
            setBalance(balance + bet);
            setMessage(Message.push);
        }
    }

    return (
        <div>
            <Status message={message} balance={balance}></Status>
            <Controls
                balance={balance}
                gameState={gameState}
                buttonState={buttonState}
                betEvent={placeBet}
                hitEvent={hit}
                standEvent={stand}
                resetEvent={resetGame}
            />
            <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
            <Hand title={`Your Hand (${playerScore})`} cards={playerCards} />
        </div>
    )
}

export default App;