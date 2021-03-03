import * as React from 'react'
import { sheet } from './sheet'
import { PanacheContext } from './provider'
import { StyleGenerator, StyleObject } from './types'
import { hash } from '@panache/core'

function createComponentId(
  styleObject: StyleObject,
  props: React.ComponentProps<any>,
  asTarget: string
): string {
  const styleIdentifier = JSON.stringify(styleObject)
  const propsIdentifier = JSON.stringify({ ...props, children: null })
  const hashedIdentifier = `p${hash(asTarget + styleIdentifier + propsIdentifier)}`

  return hashedIdentifier
}

export const extend = (parentComponent) => (styles: StyleObject | StyleGenerator) => {
  // TODO
}

export function createComponent(
  TargetComponent: string,
  styles: StyleObject | StyleGenerator,
) {
  function PanacheComponent(props: React.ComponentProps<any>, ref) {
    const context = React.useContext(PanacheContext)
    const { className, children, as } = props
    const asTarget = as ?? TargetComponent

    // get style object
    const componentStyleObject = typeof styles === 'function'
      ? styles({ ...context, ...props }) : styles
    // Identifer is a hashed combination of the components target, style and props
    const componentVariationId = createComponentId(componentStyleObject, props, asTarget)

    const computedProps = {
      ...props,
      //ref,
      className: className ? [componentVariationId, className].join(' ') : componentVariationId
    }

    sheet.add(componentStyleObject, componentVariationId)

    return React.createElement(asTarget, computedProps, children)
  }

  PanacheComponent.Styles = styles
  PanacheComponent.TargetComponent = TargetComponent

  return PanacheComponent
}