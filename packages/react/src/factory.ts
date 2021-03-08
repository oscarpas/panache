import * as React from 'react'
import type { Styles, StyleGenerator, StyleObject, StyleList } from '@panache/core/dist/types'
import { hash, mergeObjects } from '@panache/core'
import isPropValid from '@emotion/is-prop-valid'
import { sheet } from './sheet'
import { PanacheContext } from './provider'

/**
 * Create a unique hashed identifer for a component
 * using its target type and stringified styles and props
 */
function createComponentId(
  styleObject: StyleObject,
  props: React.ComponentProps<any>,
  asTarget: string,
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
  props: React.ComponentProps<any>,
): StyleObject {
  const isStyleList = (styleToCheck: Styles): styleToCheck is StyleList =>
    Array.isArray(styleToCheck)
  const isStyleGenerator = (style: StyleObject | StyleGenerator): style is StyleGenerator =>
    typeof style === 'function'

  const mergeStyleObjects = (acc: StyleObject, style: StyleGenerator | StyleObject): StyleObject =>
    mergeObjects(acc, isStyleGenerator(style) ? style(props) : style)

  // eslint-disable-next-line
  return isStyleList(styles)
    ? styles.reduce(mergeStyleObjects, {})
    : isStyleGenerator(styles) ? styles(props) : styles
}

export interface PanacheComponent {
  (props: React.ComponentProps<any>): any
  Styles?: StyleObject | StyleGenerator | Array<StyleObject|StyleGenerator>
  Type?: string
}

/**
 * Create a react component styled with StyleObject(s)
 */
export function createComponent(
  type: string,
  styles: StyleObject | StyleGenerator | Array<StyleObject|StyleGenerator>,
): PanacheComponent {
  let PanacheComponent: PanacheComponent

  // eslint-disable-next-line
  PanacheComponent = function (props) {
    const context = React.useContext(PanacheContext)
    const { className, children, as, theme, media, ...rest } = props
    const asTarget = as ?? type

    const componentStyleObject = getStyleObject(styles, { ...context, ...props })
    const componentVariationId = createComponentId(componentStyleObject, props, asTarget)

    const validProps = Object.entries(rest).reduce((acc, [key, value]) => ({
      ...acc,
      ...isPropValid(key) ? { [key]: value } : undefined,
    }), {})

    const computedProps = {
      ...validProps,
      className: className ? [componentVariationId, className].join(' ') : componentVariationId,
    }

    sheet.add(componentStyleObject, componentVariationId)

    return React.createElement(asTarget, computedProps, children)
  }

  PanacheComponent.Styles = styles
  PanacheComponent.Type = type

  return PanacheComponent
}

/**
 * Creates a new PanacheComponent which inherits it's styles
 * from one or several source components or style objects
 *
 * @todo extend third-party components?
 */
export const extendComponent = (...sources: Array<PanacheComponent|StyleObject>) =>
  (styles: StyleObject | StyleGenerator) => {
    const isPanacheComponent = (
      source: PanacheComponent | StyleObject,
    ): source is PanacheComponent => typeof source === 'function'

    const inheritedStyles = sources.map((s) => isPanacheComponent(s) ? s.Styles : s)
    const asTarget = isPanacheComponent(sources[0]) ? sources[0].Type : 'div'
    // @ts-ignore: should type guard this
    return createComponent(asTarget, [...inheritedStyles, styles])
  }

export function createGlobalStyle(style: StyleObject | StyleGenerator, reset?: StyleObject) {
  function GlobalStyleComponent(props: React.ComponentProps<any>) {
    const context = React.useContext(PanacheContext)
    const styles = reset ? [reset, style] : style
    const componentStyleObject = getStyleObject(styles, { ...context, ...props })

    sheet.add(componentStyleObject, 'global', true)

    return null
  }

  return GlobalStyleComponent
}