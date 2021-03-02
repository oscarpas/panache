import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'

/**
 * Theme based on:
 * https://github.com/shuding/nextra-theme-docs/blob/master/src/misc/theme.js
 */
const THEME = {
  plain: {
    color: 'inherit',
  },
  styles: [
    {
      types: ['keyword'],
      style: {
        color: '#ff0078',
        fontWeight: 'bold',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#999',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url', 'attr-value'],
      style: {
        color: '#00ad86',
      },
    },
    {
      types: ['variable', 'language-javascript'],
      style: {
        color: '#0076ff',
      },
    },
    {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: '#000',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#d9931e',
        fontStyle: 'normal',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'inherit',
      },
    },
    {
      types: ['number', 'function', 'tag'],
      style: {
        color: '#0076ff',
      },
    },
    {
      types: ['boolean', 'regex'],
      style: {
        color: '#d9931e',
      },
    },
  ],
}

const CodeBlock = (props) => {
  const childProps = props?.children?.props
  if (!childProps) return null

  const { children, className } = childProps
  const language = className.replace(/language-/, '')

  return (
    <Highlight {...defaultProps} code={children} language={language} theme={THEME}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default  CodeBlock