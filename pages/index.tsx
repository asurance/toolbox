import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import TagCard from '../components/TagCard'
import { Tag, Tool } from '../interfaces/tool'

type Props = {
    version: number,
    tools: Tool[],
}

export default function Page({
    tools,
}: Props): ReactNode {
    const tagMap = new Map<Tag, Tool[]>()
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

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            version: 0,
            tools: [
                {
                    id: 0,
                    name: 'Mixamo',
                    description: '3d动作资源网站',
                    tag: '3d资源',
                    url: 'https://www.mixamo.com/'
                },
                {
                    id: 1,
                    name: 'Sketchfab',
                    description: '3d模型资源网站',
                    tag: '3d资源',
                    url: 'https://sketchfab.com/'
                },
                {
                    id: 2,
                    name: 'Indienova',
                    description: '独立游戏资讯网站',
                    tag: '独立游戏',
                    url: 'https://www.indienova.com/'
                },
                {
                    id: 3,
                    name: 'Audacity',
                    description: '免费音频编辑软件',
                    tag: '音频',
                    url: 'https://www.audacityteam.org/'
                },
                {
                    id: 4,
                    name: 'freesound',
                    description: '免费音频资源网站',
                    tag: '音频',
                    url: 'https://freesound.org/'
                },
                {
                    id: 5,
                    name: 'Spector.js',
                    description: 'WebGL调试工具',
                    tag: 'WebGL',
                    url: 'https://spector.babylonjs.com/'
                },
                {
                    id: 6,
                    name: 'khronos',
                    description: 'WebGL官方文档',
                    tag: 'WebGL',
                    url: 'https://www.khronos.org/webgl/'
                },
                {
                    id: 7,
                    name: 'The Spriters Resource',
                    description: '2d资源网站',
                    tag: '2d资源',
                    url: 'https://www.spriters-resource.com/'
                },
                {
                    id: 8,
                    name: 'MathStudio',
                    description: '数学工具',
                    tag: '数学',
                    url: 'http://mathstud.io/'
                },
                {
                    id: 9,
                    name: 'Shadershop',
                    description: '数学工具',
                    tag: '数学',
                    url: 'http://tobyschachman.com/Shadershop/editor/'
                },
                {
                    id: 10,
                    name: 'cypress',
                    description: '前端测试框架',
                    tag: 'js',
                    url: 'https://www.cypress.io/'
                },
            ]
        }
    }
}