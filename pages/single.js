import { useState } from 'react';
import styles from '../styles/Single.module.css'

import BlockElement from '../components/blockelement'
var currentPlayer = 'X';
function single(props) {
    const [statusDisplay, setStatusDisplay] = useState(`Start Player ${currentPlayer}`);
    const [gameActive, setGameActive] = useState(true);
    const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""]);
    const [usedCells, setUsedCells] = useState([]);

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer} 's turn`;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setStatusDisplay(winningMessage);
            setGameActive(false);
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            setStatusDisplay(drawMessage);
            setGameActive(false);
            return;
        }

        handlePlayerChange();

    }

    const handleCellClick = (event, cellNumber) => {
        const clickedCell = event.target;
        setUsedCells(old => [...old, clickedCell])
        const clickedCellIndex = parseInt(cellNumber);

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    const handleRestartGame = () => {
        setGameActive(true);
        currentPlayer = "X";
        setGameState(["", "", "", "", "", "", "", "", ""]);
        setStatusDisplay(`Start Player ${currentPlayer}`);
        usedCells.forEach(e => {
            e.innerHTML = ' ';
        });

    }

    const handlePlayerChange = () => {
        currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
        setStatusDisplay(currentPlayerTurn);

    }

    return (
        <div className={'container'}>
            <div>
                <section>
                    <h1 className="game__title">Tic Tac Toe</h1>
                    <div className="game__container">
                        <BlockElement handleCellClick={handleCellClick} index={0} />
                        <BlockElement handleCellClick={handleCellClick} index={1} />
                        <BlockElement handleCellClick={handleCellClick} index={2} />
                        <BlockElement handleCellClick={handleCellClick} index={3} />
                        <BlockElement handleCellClick={handleCellClick} index={4} />
                        <BlockElement handleCellClick={handleCellClick} index={5} />
                        <BlockElement handleCellClick={handleCellClick} index={6} />
                        <BlockElement handleCellClick={handleCellClick} index={7} />
                        <BlockElement handleCellClick={handleCellClick} index={8} />
                    </div>
                    <h2 className="game__status">{statusDisplay}</h2>
                    <button onClick={handleRestartGame} className="game__restart">Restart Game</button>
                </section>
            </div>
        </div>
    )
}

export default single
