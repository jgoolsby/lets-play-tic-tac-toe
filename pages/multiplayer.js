import { useState, useEffect } from 'react'

import { withRouter, useRouter } from 'next/router'

import styles from '../styles/Multiplayer.module.css'

import BlockElement from '../components/blockelement'

import socketIOClient from "socket.io-client"

var currentPlayer = 'X'

let socket

const ENDPOINT = "http://99.14.164.122:3104"

function Multiplayer(props) {

    const router = useRouter()

    const [gameCode, setGameCode] = useState('')
    const [currentPlayerSign, setCurrentPlayerSign] = useState(null)
    const [statusDisplay, setStatusDisplay] = useState(``)

    useEffect(() => {

        // Connect to Socket IO client
        socket = socketIOClient(ENDPOINT + "?created=" + props.router.query.gc + "&gameCode=" + props.currentGameCode, { secure: true })

        // if game creator, sign is O, non-game creator opponent is X
        if (props.router.query.gc === 'true') {
            setStatusDisplay(`Player O`)
            setCurrentPlayerSign('O')
        } else {
            setStatusDisplay(`Player X`)
            setCurrentPlayerSign('X')
        }

        // Socket listener for gameCode channel - will set gameCode state upon receive
        socket.on('gameCode', (e => {
            setGameCode(e.gameCode)
        }))
        socket.on('intro', (e) => {
            console.log(e, ' is e ')
        })

    }, [])

    const handleCellClick = () => {

    }

    const handleRestartGame = () => {

    }

    // If game code is not set, redirect to Join lobby
    if (gameCode === 'null' || gameCode === null) {
        router.push({ pathname: '/join' })
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
                    <div style={{ borderRadius: '6px', margin: 0, padding: 0, color: 'green', fontSize: '16' }}>Your Turn</div>
                    <h2 className="game__status">{statusDisplay}</h2>
                    <button onClick={handleRestartGame} className="game__restart">Restart Game</button>
                </section>

            </div>
        </div>
    )
}

export default withRouter(Multiplayer)
