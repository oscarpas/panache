import * as React from 'react'
import { sheet } from './sheet'
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

export function createElement(TargetComponent: string, styles: StyleObject | StyleGenerator) {
  const PanacheComponent = React.forwardRef((props: React.ComponentProps<any>, ref) => {
    const context = React.useContext(PanacheContext)

    // TODO: refactor component id to something more robust
    // Use props as identifier (without children to avoid circular structure)
    // identifer should include TargetComponent?
    const identifier = JSON.stringify({ ...props, children: null })
    const [componentVariationId] = React.useState(`pn${String(hash(identifier))}`)

    const computedProps = {
      ...props,
      ref,
      className: [componentVariationId, props.className].join(' ')
    }

    // get style object
    const componentStyleObject = typeof styles === 'function'
      ? styles({ ...context, ...props }) : styles
    // add component styles to sheet
    sheet.add(componentStyleObject, componentVariationId)

    return React.createElement(TargetComponent, computedProps, props.children)
  })

  return PanacheComponent
}