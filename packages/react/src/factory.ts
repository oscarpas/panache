import * as React from 'react'
import { serverSheet, createStyleTag, removeStyleTag } from './sheet'
import { PanacheContext } from './provider'
import { StyleGenerator, StyleObject } from './types'

function hash(text: string): number {
  let hash = 5381
  let index = text.length

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index)
  }

  return hash >>> 0
}

export function createElement(TargetComponent: string, styles: StyleObject | StyleGenerator ) {
  const PanacheComponent = React.forwardRef((props: React.ComponentProps<any>, ref) => {
    const isServerRendered = typeof window === 'undefined'
    const context = React.useContext(PanacheContext)

    // Use props as identifier (without children to avoid circular structure)
    // TODO: identifer should include TargetComponent?
    const identifier = JSON.stringify({ ...props, children: null })
    const [componentVariationId] = React.useState(`pn${String(hash(identifier))}`)

    const computedProps = {
      ...props,
      ref,
      className: [componentVariationId, props.className].join(' ')
    }

    // styles can be a function or object
    const componentStyle = typeof styles === 'function' ? styles({ ...context, ...props }): styles

    // Add styles to server sheet if SSR
    if (isServerRendered) serverSheet.add(styles, componentVariationId)

    // Otherwise add style on first render
    React.useEffect(() => {
      if (isServerRendered) return
      createStyleTag(componentStyle, componentVariationId)
      return () => removeStyleTag(componentVariationId)
    }, [isServerRendered])

    // Update styles when props change
    React.useEffect(() => {
      createStyleTag(componentStyle, componentVariationId)
    }, [identifier])

    return React.createElement(TargetComponent, computedProps, props.children)
  })

  return PanacheComponent
}