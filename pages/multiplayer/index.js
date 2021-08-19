// Opponent Page

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
function o(props) {

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

    useEffect(() => {

        // Connect to Socket IO client
        socket = socketIOClient(ENDPOINT + "?created=" + props.router.query.gc + "&gameCode=" + props.currentGameCode, { secure: true })

        setCreator(false)
        setStatusDisplay(`Player X`)
        setCurrentPlayerSign('X')
        sign = 'X'

        // Socket listener for gameCode channel - will set gameCode state upon receive
        socket.on('gameCode', (e => {
            setGameCode(e.gameCode)
        }))

        socket.on('gameboards', (e) => {

            let xp = document.getElementById(e.clickedCell)
            xp.innerHTML = e.currentPlayerSign;
            // call handleResultValidation - if no winnder, then run code below

            let tempNumofTurns = e.numOfTurns + 1
            console.log(tempNumofTurns, ' ifafafafafafa')
            setNumOfTurns(tempNumofTurns)
            console.log(e, ' is gameboard e', numOfTurns)
            if (e.currentPlayerSign !== sign) {
                setMyTurn(!myTurn)
                setOpponentTurn(!opponentTurn)
            }
        })

    }, [])

    useEffect(() => {
        if (myTurn) {
            document.getElementById("game__container").style.pointerEvents = "all";
        } else {
            document.getElementById("game__container").style.pointerEvents = "none";
        }
    }, [myTurn])

    // On initial Load 
    useEffect(() => {
        socket.on('intro', (e) => {
            setOpponentTurn(false)
            setMyTurn(true)
            setStatusDisplay('Your Turn')
        })
    }, [creator])

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        // Convert clicked cell number into String
        let Str = JSON.stringify(clickedCellIndex)

        // Add game sign to gameboard state
        gameState[clickedCellIndex] = currentPlayerSign

        // Show game state change on gameboard real-time
        clickedCell.innerHTML = currentPlayerSign

        // send move to opponent gameboard via socket 
        socket.emit(`gameboard-${gameCode}`, { currentPlayerSign, clickedCell: Str, numOfTurns })

        setMyTurn(false)
        setOpponentTurn(true)

    }

    const disableGameBoard = () => {
        document.getElementById("game__container").style.pointerEvents = "none"
    }

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
                    {/* <button onClick={disableGameBoard} className="game__restart">Restart Game</button> */}
                </section>

            </div>
        </div>
    )
}

export default withRouter(o)
