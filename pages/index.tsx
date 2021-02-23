import { GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactElement, ReactNode, useCallback } from 'react'
import AddCard from '../components/AddCard'
import TagCard from '../components/TagCard'
import { Tag, Tool } from '../interfaces/tool'

type Props = {
    version: number,
    tools: Tool[],
}

export default function Page({
    version,
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
    const onClick = useCallback(() => {
        const newTools = []
        let id = 0
        for (const tool of tools) {
            newTools.push({ ...tool, id })
            id++
        }
        const newProps: Props = {
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

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            'version': 2,
            'tools': [
                {
                    'id': 0,
                    'name': 'Mixamo',
                    'description': '3d动作资源网站',
                    'tag': '3d资源',
                    'url': 'https://www.mixamo.com/'
                },
                {
                    'id': 1,
                    'name': 'Sketchfab',
                    'description': '3d模型资源网站',
                    'tag': '3d资源',
                    'url': 'https://sketchfab.com/'
                },
                {
                    'id': 2,
                    'name': 'Indienova',
                    'description': '独立游戏资讯网站',
                    'tag': '独立游戏',
                    'url': 'https://www.indienova.com/'
                },
                {
                    'id': 3,
                    'name': 'Audacity',
                    'description': '免费音频编辑软件',
                    'tag': '音频',
                    'url': 'https://www.audacityteam.org/'
                },
                {
                    'id': 4,
                    'name': 'freesound',
                    'description': '免费音频资源网站',
                    'tag': '音频',
                    'url': 'https://freesound.org/'
                },
                {
                    'id': 5,
                    'name': 'Spector.js',
                    'description': 'WebGL调试工具',
                    'tag': 'WebGL',
                    'url': 'https://spector.babylonjs.com/'
                },
                {
                    'id': 6,
                    'name': 'khronos',
                    'description': 'WebGL官方文档',
                    'tag': 'WebGL',
                    'url': 'https://www.khronos.org/webgl/'
                },
                {
                    'id': 7,
                    'name': 'The Spriters Resource',
                    'description': '2d资源网站',
                    'tag': '2d资源',
                    'url': 'https://www.spriters-resource.com/'
                },
                {
                    'id': 8,
                    'name': 'MathStudio',
                    'description': '数学工具',
                    'tag': '数学',
                    'url': 'http://mathstud.io/'
                },
                {
                    'id': 9,
                    'name': 'Shadershop',
                    'description': '数学工具',
                    'tag': '数学',
                    'url': 'http://tobyschachman.com/Shadershop/editor/'
                },
                {
                    'id': 10,
                    'name': 'cypress',
                    'description': '前端测试框架',
                    'tag': '前端',
                    'url': 'https://www.cypress.io/'
                },
                {
                    'id': 11,
                    'name': 'free-font',
                    'description': '中文免费可商用字体',
                    'tag': '字体',
                    'url': 'https://github.com/wordshub/free-font'
                },
                {
                    'id': 12,
                    'name': 'Font Awesome',
                    'description': '图形化字体',
                    'tag': '字体',
                    'url': 'https://fontawesome.dashgame.com/'
                },
                {
                    'id': 13,
                    'name': 'Adobe Color',
                    'description': 'adobe 调色盘',
                    'tag': '前端',
                    'url': 'https://color.adobe.com/zh/explore'
                },
                {
                    'id': 14,
                    'name': 'Rust月刊',
                    'description': 'Rust语言开源杂志',
                    'tag': 'Rust',
                    'url': 'https://rustmagazine.github.io/rust_magazine_2021/index.html'
                },
                {
                    'id': 15,
                    'name': 'Code My UI',
                    'description': 'UI样例网站',
                    'tag': '前端',
                    'url': 'https://codemyui.com/'
                },
                {
                    'id': 16,
                    'name': '30 seconds of code',
                    'description': '代码片段',
                    'tag': '前端',
                    'url': 'https://www.30secondsofcode.org/'
                },
                {
                    'id': 17,
                    'name': 'NW.js',
                    'description': '类似electron桌面开发库',
                    'tag': 'js库',
                    'url': 'https://nwjs.org.cn/'
                },
                {
                    'id': 18,
                    'name': 'Talend API Tester',
                    'description': 'Http请求和url解析插件',
                    'tag': 'chrome插件',
                    'url': 'https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm'
                },
                {
                    'id': 19,
                    'name': 'collection.js',
                    'description': 'js容器库',
                    'tag': 'js库',
                    'url': 'http://www.collectionsjs.com/'
                },
                {
                    'id': 20,
                    'name': 'danger.js',
                    'description': 'CI工具链库',
                    'tag': 'js库',
                    'url': 'https://danger.systems/js/'
                },
                {
                    'id': 21,
                    'name': 'Multiavatar',
                    'description': '假头像库',
                    'tag': 'js库',
                    'url': 'https://multiavatar.com/'
                },
                {
                    'id': 22,
                    'name': 'faker.js',
                    'description': '假数据库',
                    'tag': 'js库',
                    'url': 'https://github.com/Marak/faker.js'
                }
            ]
        }
    }
}