import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={'container'}>
      <Head>
        <title>Let&apos;s Play Tic Tac Toe! </title>
        <meta name="description" content="Single and Multi-player Tic Tac Toe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 className={styles.title}>
          Let&apos;s Play<br />  <a href="https://nextjs.org">Tic Tac Toe!</a>
        </h1>

        <p className={styles.description}>
          {' '}
          <code className={styles.code}>Play Solo or With Friends</code>
        </p>

        <div className={styles.grid}>
          <Link href="/single" passHref>
            <div className={styles.card}>
              <h2>Single Player &rarr;</h2>
              <p>Find in-depth information about Next.js features and APIs.</p>
            </div>
          </Link>

          <Link href="/join" passHref>
            <div className={styles.card}>
              <h2>Multi-player &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </div>
          </Link>
          <Link href="/credits" passHref>
            <div
              className={styles.card}
            >
              <h2>Credits &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            Kovonix
          </span>
        </a>
      </footer>
    </div>
  )
}
