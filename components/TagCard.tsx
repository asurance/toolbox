import { ReactElement } from 'react'
import { Tool } from '../interfaces/tool'
import CardItem from './CardItem'

type Props = {
    tools: Tool[]
}

export default function TagCard({
    tools,
}: Props): ReactElement {
    const toolElements = tools.map(tool => <CardItem key={tool.id} tool={tool} />)
    return <section className="card">
        <header>
            {tools[0].tag}
        </header>
        <div className="container">
            {toolElements}
        </div>
    </section>
}