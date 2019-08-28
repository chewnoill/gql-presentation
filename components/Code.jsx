import React from 'react'

import Highlight, {
    defaultProps,
} from 'prism-react-renderer'
import styled  from 'styled-components'
import CodeSurfer from "code-surfer";

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  line-height: 1.3;
  font-size: 25px;
`

export const Code = ({ children, ...props }) => (
    <Highlight
        {...defaultProps}
        code={children}
        {...props}
      >
      {({ className, style: {backgroundColor, ...style}, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </Pre>
      )}</Highlight>
)

export const CodeSurf = ({
  snippet,
  ...props
}) => (
  <div style={{
    maxHeight: "100vh",
    maxWidth: "100vw",
         padding: "20px",
         fontSize:"30px"
       }}>
  <CodeSurfer
    dark={true}
    code={require(`!raw-loader!../snippets/${snippet}`).default}
    {...props}
    />
  </div>
)
