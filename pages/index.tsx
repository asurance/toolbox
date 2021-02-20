import Head from 'next/head'
import { ReactNode } from 'react'

export default function Home(): ReactNode {
    return (
        <div>
            <Head>
                <title>Asurance的工具箱</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header id="header">
                Asurance的工具箱
            </header>
            <main id="main">

            </main>
        </div>
    )
}
