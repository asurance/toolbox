import { ReactElement } from 'react'
import { Tool } from '../interfaces/tool'
import Link from 'next/link'

type Props = {
    tool: Tool
}

export default function CardItem({
    tool,
}: Props): ReactElement {
    return <Link href={tool.url} >
        <a title={tool.description}>
            {tool.name}
        </a>
    </Link>
}