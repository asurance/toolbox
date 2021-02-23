import Head from 'next/head'
import { ReactElement, ReactNode, useCallback } from 'react'
import AddCard from '../components/AddCard'
import TagCard from '../components/TagCard'
import { Tool } from '../interfaces/tool'
import defaultProps from '../assets/tools.json'

export default function Page(): ReactNode {
    const { tools, version } = defaultProps
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
    const onClick = useCallback(() => {
        const newTools = []
        let id = 0
        for (const tool of tools) {
            newTools.push({ ...tool, id })
            id++
        }
        const newProps = {
            version: version + 1,
            tools: newTools
        }
        navigator.clipboard.writeText(JSON.stringify(newProps, undefined, 4))
    }, [tools, version])
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
                <svg
                    onClick={onClick}
                    className="copy"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>导出</title>
                    <path d="M1024 1024H0V0h496.064v113.792H113.792v796.416h796.416V607.552H1024zM1006.4 266.688l-260.48 317.824-87.424-72.064 150.4-181.568c-152.64 17.024-308.16 97.6-321.216 350.144-3.392 68.672-3.392 113.472-3.392 113.472H370.816s0-46.528 3.968-119.168c13.632-257.664 157.184-418.816 397.248-454.016l-154.944-128L689.152 4.224z">
                    </path>
                </svg>
            </header>
            <main id="main">
                {toolCards}
                <AddCard />
            </main>
        </div>
    )
}