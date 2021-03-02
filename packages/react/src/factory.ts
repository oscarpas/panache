import * as React from 'react'
import { sheet } from './sheet'
import { PanacheContext } from './provider'
import { StyleGenerator, StyleObject } from './types'

function hash(text: string): string {
  let hash = 5381
  let index = text.length

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index)
  }

  return String(hash >>> 0)
}

export function createElement(TargetComponent: string, styles: StyleObject | StyleGenerator) {
  const PanacheComponent = React.forwardRef((props: React.ComponentProps<any>, ref) => {
    const context = React.useContext(PanacheContext)

    // get style object
    const componentStyleObject = typeof styles === 'function'
      ? styles({ ...context, ...props }) : styles

    // Identifer is a hashed combination of the components target, style and props
    const styleIdentifier = JSON.stringify(componentStyleObject)
    const propsIdentifier = JSON.stringify({ ...props, children: null })
    const hashedIdentifier = `p${hash(TargetComponent + styleIdentifier + propsIdentifier)}`
    const [componentVariationId] = React.useState(hashedIdentifier)

    const computedProps = {
      ...props,
      ref,
      className: [componentVariationId, props.className].join(' ')
    }

    sheet.add(componentStyleObject, componentVariationId)

    return React.createElement(TargetComponent, computedProps, props.children)
  })

  return PanacheComponent
}