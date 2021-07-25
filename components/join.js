import { useState } from 'react'

import styles from '../styles/Join.module.css'
import Image from 'next/image'
import Arrow from '../public/arrow.svg'
function join() {

    const [gameFound, setGameFound] = useState(null)

    const validateCode = (code) => {
        if (code.length !== 5) {
            return;
        } else {
            console.log(code)
            if (code === '12345') {
                setGameFound(true)
                // alert('GAME')
            }
        }
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
                            <input onChange={(e) => validateCode(e.target.value)} className={styles.SearchInput} type="search" maxLength={5} />
                            <br />
                            {gameFound ? (<Image width="30" height="50" src={Arrow} alt="" className={styles.arrow} />) : ('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default join