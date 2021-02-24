import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import TagCard from '../components/TagCard'
import { Tool } from '../interfaces/tool'
import defaultProps from '../assets/tools.json'

export default function Page(): ReactNode {
    const { tools } = defaultProps
    const tagMap = new Map<string, Tool[]>()
    for (const tool of tools) {
        let toolList: Tool[]
        if (tagMap.has(tool.tag)) {
            toolList = tagMap.get(tool.tag)!
        } else {
            toolList = []
            tagMap.set(tool.tag, toolList)
        }
        toolList.push(tool)
    }
    const toolCards: ReactElement[] = []
    for (const toolList of tagMap.values()) {
        toolCards.push(<TagCard key={toolList[0].tag} tools={toolList} />)
    }
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
                {toolCards}
            </main>
        </div>
    )
}