import { ReactElement } from 'react'
import { Tool } from '../interfaces/tool'

type Props = {
    tools: Tool[]
}

export default function TagCard({
    tools,
}: Props): ReactElement {
    return <section>{tools.length}</section>
}