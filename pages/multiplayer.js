import { useState, useEffect } from 'react'

import styles from '../styles/Multiplayer.module.css'

import BlockElement from '../components/blockelement'

import socketIOClient from "socket.io-client";

var currentPlayer = 'X'

let socket;

const ENDPOINT = "http://99.14.164.122:3104";

function multiplayer() {

    const [statusDisplay, setStatusDisplay] = useState(`Start Player ${currentPlayer}`);
    const [gameCode, setGameCode] = useState('')


    useEffect(() => {
        socket = socketIOClient(ENDPOINT + "?created=" + 'true', { secure: true });
        socket.on('gameCode', (e => {
            setGameCode(e.gameCode)
        })
        )
    }, [])

    const handleCellClick = () => {

    }

    const handleRestartGame = () => {

    }

    return (
        <div className={'container'}>
            <div style={{
                width: '200px'
            }}>
                <div style={{ textAlign: 'center' }}>Game Code</div>
                <h2 style={{ textAlign: 'center' }}>{gameCode}</h2>
            </div>
            <div>
                <br />
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

export default multiplayer
