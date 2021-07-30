import '../styles/globals.css'

import { useState } from 'react'

function MyApp({ Component, pageProps }) {

  const [currentGameCode, setCurrentGameCode] = useState(null)


  return <Component {...pageProps} currentGameCode={currentGameCode} setCurrentGameCode={setCurrentGameCode} />
}

export default MyApp
