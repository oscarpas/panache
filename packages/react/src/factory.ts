import * as React from 'react'
import { sheet } from './sheet'
import { PanacheContext } from './provider'
import type { Styles, StyleGenerator, StyleObject, StyleList } from '@panache/core/src/types'
import {  PanacheComponent } from './types'
import { hash } from '@panache/core'
import { mergeObjects } from '@panache/core'

/**
 * Create a unique hashed identifer for a component
 * using its target type and stringified styles and props
 */
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

/**
 * Given a StyleObject, a StyleGenerator or an array of both types
 * this function will merge and return a single StyleObject
 */
function getStyleObject(
  styles: Styles,
  props: React.ComponentProps<any>
): StyleObject {
  const isStyleList = (styles: Styles): styles is StyleList =>
    Array.isArray(styles)
  const isStyleGenerator = (style: StyleObject | StyleGenerator): style is StyleGenerator =>
    typeof style === 'function'

  const mergeStyleObjects = (acc: StyleObject, style: StyleGenerator | StyleObject): StyleObject =>
    mergeObjects(acc, isStyleGenerator(style) ? style(props) : style)

  return isStyleList(styles)
    ? styles.reduce(mergeStyleObjects, {})
    : isStyleGenerator(styles) ? styles(props) : styles
}

/**
 * Creates a new PanacheComponent which inherits it's styles from an existing component 
 * @todo should be able to pass in multiple existing components? (...components)
 * @todo should be able to pass in Style objects along with components
 * @todo extend third-party components?
 */
export const extendComponent = (sources: PanacheComponent) =>
  (styles: StyleObject | StyleGenerator) => {
  const parentStyles = sources.Styles
  const asTarget = sources.TargetComponent
  return createComponent(asTarget, [parentStyles, styles])
}

export function createComponent(
  TargetComponent: string,
  styles: StyleObject | StyleGenerator | Array<StyleObject|StyleGenerator>,
): PanacheComponent {
  function PanacheComponent(props: React.ComponentProps<any>) {
    const context = React.useContext(PanacheContext)
    const { className, children, as } = props
    const asTarget = as ?? TargetComponent

    const componentStyleObject = getStyleObject(styles, { ...context, ...props})
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