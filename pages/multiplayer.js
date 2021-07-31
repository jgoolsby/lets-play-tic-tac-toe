import { useState, useEffect } from 'react'

import { withRouter, useRouter } from 'next/router'

import styles from '../styles/Multiplayer.module.css'

import BlockElement from '../components/blockelement'

import socketIOClient from "socket.io-client"

let socket

const ENDPOINT = "http://99.14.164.122:3104"

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

function Multiplayer(props) {

    const router = useRouter()
    const [gameState, setGameState] = useState(["", "", "", "", "", "", "", "", ""]);
    const [usedCells, setUsedCells] = useState([]);
    const [gameCode, setGameCode] = useState('')
    const [currentPlayerSign, setCurrentPlayerSign] = useState(null)
    const [statusDisplay, setStatusDisplay] = useState(``)
    const [myTurn, setMyTurn] = useState(null)
    const [opponentTurn, setOpponentTurn] = useState(null)
    const [numOfTurns, setNumOfTurns] = useState(0)
    const [maxTurns, setMaxTurns] = useState(9)
    const [creator, setCreator] = useState(false)
    const [gameActive, setGameActive] = useState(true);

    // const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    //     gameState[clickedCellIndex] = currentPlayer;
    //     clickedCell.innerHTML = currentPlayer;
    // }

    useEffect(() => {

        // Connect to Socket IO client
        socket = socketIOClient(ENDPOINT + "?created=" + props.router.query.gc + "&gameCode=" + props.currentGameCode, { secure: true })

        // if game creator, sign is O, non-game creator opponent is X
        if (props.router.query.gc === 'true' || props.router.query.gc === true) {
            setCreator(true)
            setStatusDisplay(`Player O`)
            setCurrentPlayerSign('O')
        } else {
            setCreator(false)
            setStatusDisplay(`Player X`)
            setCurrentPlayerSign('X')
        }

        // Socket listener for gameCode channel - will set gameCode state upon receive
        socket.on('gameCode', (e => {
            setGameCode(e.gameCode)
        }))

    }, [])

    useEffect(() => {
        if (myTurn) {
            console.log(myTurn, opponentTurn, 'fkaljsdklasjdkljsd')
            document.getElementById("game__container").style.pointerEvents = "all";
        } else {
            console.log(myTurn, opponentTurn, ' bumper')
            document.getElementById("game__container").style.pointerEvents = "none";
        }
    }, [myTurn])

    useEffect(() => {
        socket.on('intro', (e) => {
            if (creator) {
                setMyTurn(false)
                setOpponentTurn(true)
                setStatusDisplay('Opponent ' + e.message)
            } else {
                setOpponentTurn(false)
                setMyTurn(true)
                setStatusDisplay('Your Turn')
            }

        })
    }, [creator])

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayerSign;
        clickedCell.innerHTML = currentPlayerSign;
    }

    const handleCellClick = (event, cellNumber) => {
        const clickedCell = event.target;
        setUsedCells(old => [...old, clickedCell])

        console.log(usedCells, ' is used cells')
        const clickedCellIndex = parseInt(cellNumber);

        console.log(clickedCellIndex, ' is index cell')

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }
        handleCellPlayed(clickedCell, clickedCellIndex);

    }

    const handleRestartGame = () => {

    }

    const disableGameBoard = () => {

    }

    // If game code is not set, redirect to Join lobby
    if (gameCode === 'null' || gameCode === null) {
        router.push({ pathname: '/join' })
    }

    // if (opponentTurn) {
    //     disableGameBoard()
    // } else {
    //     // if (document) {
    //     enableGameBoard()
    //     // }

    // }

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
                    Player {currentPlayerSign}
                    <div id="game__container" className="game__container">
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
                    {/* {
                        myTurn ? (
                            <div style={{ borderRadius: '6px', margin: 0, padding: 0, color: 'green', fontSize: '16' }}>Your Turn</div>
                        ) : ('')
                    }
                    {opponentTurn ? (
                        <div style={{ borderRadius: '6px', margin: 0, padding: 0, color: 'green', fontSize: '16' }}>Waiting on Opponent</div>
                    ) : ('')} */}
                    {/* {waiting on opponent} */}
                    <h2 className="game__status">{statusDisplay}</h2>
                    <button onClick={disableGameBoard} className="game__restart">Restart Game</button>
                </section>

            </div>
        </div>
    )
}

export default withRouter(Multiplayer)
