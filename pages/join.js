import Link from 'next/link'

import { useState } from 'react'

import JOIN from '../components/join'
import CREATE from '../components/create'
import SEARCH from '../components/search'

import styles from '../styles/Join.module.css'

function join() {

    const [loading, setLoading] = useState(false)
    const [currentStage, setCurrentStage] = useState('')
    const [otherUserOnline, setOtherUserOnline] = useState(true)

    // JOIN


    // SEARCH

    // CREATE

    return (
        <div className={'container'} id="joinz">
            {currentStage === 'join' ? (<JOIN />) : (currentStage === 'create' ? (<CREATE />) : currentStage === 'search' ? (<SEARCH />) : (
                <div>

                    <div onClick={() => setCurrentStage('join')} className={'card'} style={{ width: '400px' }}>
                        <h2>Join &rarr;</h2>
                        <p>Play with a friend. Join an already created game with a code.</p>
                    </div>

                    {otherUserOnline ? (<div onClick={() => setCurrentStage('search')} className={'card'} style={{ width: '400px' }}>
                        <h2>Search &rarr;</h2>
                        <p>Find a game. Search online for a random game to play.</p>
                    </div>) : (<div className={styles.greycard} style={{ width: '400px' }}>
                        <h2>Search &rarr;</h2>
                        <p>Find a game. Search online for a random game to play.</p>
                    </div>)}

                    <div onClick={() => setCurrentStage('create')} className={'card'} style={{ width: '400px' }}>
                        <h2>Create &rarr;</h2>
                        <p>Start a game and get a code to share with a friend.</p>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default join
