// Creator Page

import { useState, useEffect } from 'react'

import { withRouter, useRouter } from 'next/router'

import styles from '../../styles/Multiplayer.module.css'

import BlockElement from '../../components/blockelement'

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
]
let sign
function c(props) {

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
    const [gameActive, setGameActive] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [catsGame, setCatsGame] = useState(false)
    const winningMessage = () => `Player  aksldjalksdj has won!`

    useEffect(() => {

        // Connect to Socket IO client
        socket = socketIOClient(ENDPOINT + "?created=" + props.router.query.gc + "&gameCode=" + props.currentGameCode, { secure: true })

        // if game creator, sign is O, non-game creator opponent is X
        // if (props.router.query.gc === 'true' || props.router.query.gc === true) {
        setCurrentPlayerSign('O')
        setCreator(true)
        setOpponentTurn(true)
        setMyTurn(false)
        // setStatusDisplay(`Player O`)
        sign = 'O'

        // } 

        // Socket listener for gameCode channel - will set gameCode state upon receive
        socket.on('gameCode', (e => {
            setGameCode(e.gameCode)
        }))

        socket.on('gameboards', (e) => {
            gameState[e.clickedCell] = e.currentPlayerSign
            let xp = document.getElementById(e.clickedCell)
            xp.innerHTML = e.currentPlayerSign

            let tempNumofTurns = e.numOfTurns + 1

            setNumOfTurns(tempNumofTurns)
            if (e.currentPlayerSign !== sign) {
                setMyTurn(!myTurn)
                setOpponentTurn(!opponentTurn)
            }

        })

        socket.on('gameover', (e) => {

            // Set Game Over 
            setGameOver(true)

            // Lock Game Board 
            document.getElementById("game__container").style.pointerEvents = "none"

            // Player Wins message
            setStatusDisplay(`Player ${e.currentPlayerSign} Wins!`)
        })

        socket.on('draw', (e) => {
            setGameOver(true)
            setCatsGame(true)
            document.getElementById("game__container").style.pointerEvents = "none"
        })

    }, [])

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {

        let Str = JSON.stringify(clickedCellIndex)

        // Add game sign to gameboard state
        gameState[clickedCellIndex] = currentPlayerSign

        // Show game state change on gameboard real-time
        clickedCell.innerHTML = currentPlayerSign

        // send move to opponent gameboard via socket 
        socket.emit(`gameboard-${gameCode}`, { currentPlayerSign, clickedCell: Str, numOfTurns })
        setStatusDisplay('')
        setMyTurn(false)
        setOpponentTurn(true)

        handleResultValidation()

    }

    useEffect(() => {
        socket.on('intro', (e) => {
            setStatusDisplay('Opponent ' + e.message)
        })
    }, [creator])

    useEffect(() => {

        if (myTurn || myTurn === 'true') {
            setStatusDisplay('Your Turn')
            document.getElementById("game__container").style.pointerEvents = "all"
        } else {
            setStatusDisplay('')
            document.getElementById("game__container").style.pointerEvents = "none"
        }
    }, [myTurn])

    const handleCellClick = (event, cellNumber) => {

        // Get HTML of # of cell clicked to be used later for innerHTML update 
        const clickedCell = event.target

        // Get index of clicked cell
        const clickedCellIndex = parseInt(cellNumber)

        // set Used cell in array  - cycle through to make sure it is only added once
        setUsedCells(old => [...old, clickedCellIndex])

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        // adds clicked cell to game state function/show change on screen
        handleCellPlayed(clickedCell, clickedCellIndex)

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
            socket.emit('gameover', { currentPlayerSign, status: true })
            setStatusDisplay(winningMessage)
            setGameActive(false)
            return;
        }

        let roundDraw = !gameState.includes("")

        if (roundDraw) {
            socket.emit('draw', { status: true })
            setGameOver(true)
            setStatusDisplay('')
            setCatsGame(true)
            setGameActive(false)
            return;
        }

    }

    const handleRestartGame = () => {

    }

    const disableGameBoard = () => {
        document.getElementById("game__container").style.pointerEvents = "none"
    }

    // If game code is not set, redirect to Join lobby
    if (gameCode === 'null' || gameCode === null) {
        router.push({ pathname: '/join' })
    }

    if (numOfTurns >= maxTurns) {
        disableGameBoard()
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
                    <h2>{gameOver ? ('Game Over') : ('')}</h2>
                    <h2>{catsGame ? ('Cat\'s Game') : ('')}</h2>
                    <h2 className="game__status">{statusDisplay}</h2>
                    <button onClick={disableGameBoard} className="game__restart">Restart Game</button>
                </section>

            </div>
        </div>
    )
}

export default withRouter(c)
