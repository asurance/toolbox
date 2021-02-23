import { ReactElement } from 'react'

export default function AddCard(): ReactElement {
    return <section className="card add">
        <svg className="addicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M935.3 423.8H600.2V88.7c0-48.3-39.6-87.9-87.9-87.9h-0.7c-48.3 0-87.9 39.6-87.9 87.9v335.1h-335C40.4 423.8 0.8 463.4 0.8 511.7v0.7c0 48.3 39.6 87.9 87.9 87.9h335.1v335.1c0 48.3 39.6 87.9 87.9 87.9h0.7c48.3 0 87.9-39.6 87.9-87.9V600.2h335.1c48.3 0 87.9-39.6 87.9-87.9v-0.7c-0.1-48.3-39.6-87.8-88-87.8z">
            </path>
        </svg>
    </section>
}