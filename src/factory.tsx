import * as React from 'react'
import { createStyleTag, removeStyleTag } from './sheet'

import { ThemeContext } from './theme'
import { StyleGenerator, StyleObject } from './types'

function hash(text: string): number {
  let hash = 5381
  let index = text.length

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index)
  }

  return hash >>> 0
}

const generateRandomId = (): string => Math.random().toString(36).replace('0.', '')

export function createElement(TargetComponent: string, styles: StyleObject | StyleGenerator ) {
  const PanacheComponent = React.forwardRef((props: React.ComponentProps<any>, ref) => {
    const theme = React.useContext(ThemeContext)
    const [componentId] = React.useState(generateRandomId())
    const [componentVariationId] = React.useState(`pn${String(hash(JSON.stringify(props)))}`)


    const computedProps = {
      ...props,
      ref,
      className: [componentId, componentVariationId, props.className].join(' ')
    }

    // styles can be a function or object
    const componentStyle = typeof styles === 'function' ? styles({ theme, ...props }): styles

    React.useEffect(() => {
      createStyleTag(componentStyle, componentVariationId)
      return () => removeStyleTag(componentVariationId)
    }, [])

    React.useEffect(() => {
      createStyleTag(componentStyle, componentVariationId)
    }, [JSON.stringify(props)])

    return React.createElement(TargetComponent, computedProps, 'asisaihfaa')
  })

  return PanacheComponent
}