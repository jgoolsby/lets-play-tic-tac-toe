import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import styles from '../styles/Join.module.css'

import Image from 'next/image'

import Arrow from '../public/arrow.svg'

function Join(props) {

    const router = useRouter()

    const [gameFound, setGameFound] = useState(null)

    const validateCode = (code) => {
        if (code.length !== 5) {
            setGameFound(null)
            return;
        } else {

            fetch(`/api/gameByCode`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code
                })
            }).then(res => res.json())
                .then((json) => {

                    if (code === json.gameID) {
                        props.setCurrentGameCode(code)
                        setGameFound(true)
                    }

                })
                .catch(err => {
                    console.log(err);
                });

        }
    }

    const joinGame = () => {
        router.push({ pathname: '/multiplayer', query: { gc: false } })
    }

    return (
        <div className={styles.cont}>
            <div className={styles.panel}>
                <div className={styles.welcome}>
                    <h1>Welcome</h1>
                    <p className={styles.p}>Welcome to Tic Tac Toe multiplayer! The following options allow you to connect to a game.</p>
                </div>
                <div className={styles.join} >
                    <div className={styles.innerCode}>
                        <h2 style={{ paddingTop: '16px', paddingBottom: 0, marginBottom: 0 }}><em>Join</em> with a code</h2>
                        <div className={styles.ActionBar}>
                            <input onChange={(e) => validateCode(e.target.value)} className={styles.SearchInput} type="search" minLength={5} maxLength={5} />
                            <br />
                            {gameFound ? (<Image onClick={() => joinGame()} width="30" height="50" src={Arrow} alt="" className={styles.arrow} />) : ('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join
