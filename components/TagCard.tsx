import { ReactElement } from 'react'
import { Tool } from '../interfaces/tool'

type Props = {
    tools: Tool[]
}

export default function TagCard({
    tools,
}: Props): ReactElement {
    const toolElements = tools.map(tool => <a key={tool.id} href={tool.url} title={tool.description} >{tool.name}</a>)
    return <section className="card">
        <header className="title">
            {tools[0].tag}
        </header>
        {toolElements}
    </section>
}