import * as React from 'react'
import { sheet } from './sheet'
import { PanacheContext } from './provider'
import { StyleGenerator, StyleObject, PanacheComponent } from './types'
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

/**
 * Given an StyleObject, StyleGenerator or an array of both types
 * this function will merge and return a single StyleObject
 */
function getStyleObject(
  styles: StyleObject | StyleGenerator | Array<StyleObject|StyleGenerator>,
  props: React.ComponentProps<any>
): StyleObject {
  const isStyleGenerator = (style: StyleObject | StyleGenerator): Boolean =>
    typeof style === 'function'

  return Array.isArray(styles)
    ? styles.reduce((acc, style) => ({
      ...acc,
      ...isStyleGenerator(style) ? style(props) : style
    }), {})
    : isStyleGenerator(styles) ? styles(props) : styles
}

/**
 * Creates a new PanacheComponent which inherits it's styles from an existing component 
 * @todo should be able to pass in multiple existing components? (...components)
 * @todo extend third-party components?
 */
export const extendComponent = (components: PanacheComponent) =>
  (styles: StyleObject | StyleGenerator) => {
  const parentStyles =  components.Styles
  const asTarget = components.TargetComponent
  return createComponent(asTarget, [parentStyles, styles])
}

export function createComponent(
  TargetComponent: string,
  styles: StyleObject | StyleGenerator | Array<StyleObject|StyleGenerator>,
): PanacheComponent {
  function PanacheComponent(props: React.ComponentProps<any>, ref) {
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