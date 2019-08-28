import * as React from 'react'
import { Notes } from 'mdx-deck'

export const Note = ({ text, children }) => (
    <Notes>
        <pre>{children}</pre>
    </Notes>
)

export const List = ({ columns }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
    >
        {columns.map(rows => (
            <div>
                {rows.map(item => (
                    <div>{item}</div>
                ))}
            </div>
        ))}
    </div>
)
