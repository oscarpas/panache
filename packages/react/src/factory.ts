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
 * Creates a new PanacheComponent which inherits it's styles
 * from one or several source components or style objects
 *
 * @todo extend third-party components?
 */
export const extendComponent = (...sources: Array<PanacheComponent|StyleObject>) =>
  (styles: StyleObject | StyleGenerator) => {
  const isPanacheComponent = (source: PanacheComponent | StyleObject): source is PanacheComponent =>
    source.TargetComponent
  const inheritedStyles = sources.map(s => isPanacheComponent(s) ? s.Styles : s)
  const asTarget = sources[0].TargetComponent
  return createComponent(asTarget, [...inheritedStyles, styles])
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
    const componentVariationId = createComponentId(componentStyleObject, props, asTarget)

    const computedProps = {
      ...props,
      className: className ? [componentVariationId, className].join(' ') : componentVariationId
    }

    sheet.add(componentStyleObject, componentVariationId)

    return React.createElement(asTarget, computedProps, children)
  }

  PanacheComponent.Styles = styles
  PanacheComponent.TargetComponent = TargetComponent

  return PanacheComponent
}