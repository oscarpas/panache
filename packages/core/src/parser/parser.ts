import sortBy from 'lodash-es/sortBy'
import { StyleObject } from '../types'
import camelToDash from '../utils/string'
import prefixCss from '../prefixer/prefixer'

type StyleItemValues = [cssProperty: string, cssValue: string]

interface StyleItem {
  selector: string,
  values: StyleItemValues,
  media: string | void
}

/**
 * Recursively parse a StyleObject into a flat array of StyleItems
 */
export function parseStyleObject(
  styleObject: StyleObject,
  parentClasses: Array<string>,
  mediaRule: string | void,
): Array<StyleItem> {
  const entries = Object.entries(styleObject)
  const rules: Array<StyleItem> = []

  function pushRule(values: StyleItemValues, media: string | void) {
    const [property, value] = values
    const [prefixedValues, additionalProperties] = prefixCss(property, value)
    const styleItem = {
      selector: parentClasses.join(' ').replace(' &', ''),
      values,
      media,
    }

    // Push any prefixed values
    if (prefixedValues) {
      for (let i = 0; i < prefixedValues.length; i++) {
        rules.push({ ...styleItem, values: [property, prefixedValues[i]] })
      }
    }
    // Push any additional properties generated by prefixer
    if (Object.keys(additionalProperties).length > 0) {
      const additionalEntries = Object.entries(additionalProperties)
      for (let i = 0; i < additionalEntries.length; i++) {
        rules.push({ ...styleItem, values: [additionalEntries[i][0], additionalEntries[i][1]] })
      }
    }
    // Push the base value
    rules.push(styleItem)
  }

  for (let i = 0; i < entries.length; i++) {
    const [key, style] = entries[i]

    // If style is an array it means it's a responsive variable
    if (Array.isArray(style)) {
      const property = key

      // Push each responsive value as rules
      for (let j = 0; j < style.length; j++) {
        // Skip this iteration if value isn't valid
        if (typeof style[j] !== 'string' && !Array.isArray(style[j])) continue

        // If the value is a string it's the default value of the responsive variable
        if (typeof style[j] === 'string') pushRule([property, style[j]])
        // Otherwise it's a value bound to a media query in this form: [media, value]
        // pushRule(prefixRule(selector, values, media))?
        else pushRule([property, style[j][1]], style[j][0])
      }
    }
    // Recursively parse if style is an object
    else if (typeof style === 'object') {
      const isMediaObject = key.includes('@media')
      // Add media rule to object if current object is media,
      // or if inherited from parent
      const currentMediaRule = isMediaObject ? key : mediaRule || undefined

      // Don't add current key as class if it's a media object
      const currentClass = isMediaObject ? [] : [key]
      const classes = [...parentClasses, ...currentClass]
      rules.push(...parseStyleObject(style, classes, currentMediaRule))
    }
    // If it's not an object we can add it as a StyleItem
    else {
      pushRule(entries[i], mediaRule)
    }
  }

  // Put rules with media queries at the end
  const rulesSorted = sortBy(rules, (r) => r.media !== undefined)

  return rulesSorted
}

type CssRules = Array<string>

interface MediaRules {
  [selector: string]: CssRules
}

interface ComponentSheet {
  [MediaQueryOrSelector: string]: CssRules | MediaRules
}

/**
 * Parse an array of StyleItems into a ComponentSheet
 * where rules are grouped by selector and media query
 * @todo: use hyphenateStyleName instead of camelToDash?
 */
export function parseStyleItems(rules: Array<StyleItem>) {
  const componentSheet = {} as ComponentSheet

  // Group CSS rules by selector and media query
  for (let i = 0; i < rules.length; i++) {
    const { media, selector } = rules[i]
    const [cssProperty, cssValue] = rules[i].values
    const cssRule = `${camelToDash(cssProperty)}:${cssValue}`

    // Add css rule to selector
    if (!media) {
      componentSheet[selector] = [
        // @ts-ignore: should type guard this
        ...componentSheet[selector] || [],
        cssRule,
      ]
    }
    // Insert MediaRules
    else {
      componentSheet[media] = {
        ...componentSheet[media],
        [selector]: [
          // @ts-ignore: should type guard this
          ...componentSheet?.[media]?.[selector] || [],
          cssRule,
        ],
      }
    }
  }

  return componentSheet
}

/**
 * Convert a ComponentSheet into a string of valid CSS
 */
export function componentSheetToString(sheet: ComponentSheet): string {
  return Object
    .entries(sheet)
    .map(([key, values]) => {
      if (!Array.isArray(values)) return `${key}{${componentSheetToString(values)}}`
      return `${key}{${values.join(';')}}`
    })
    .join(' ')
}

/**
 * Run parser functions to convert a StyleObject into valid CSS
 * @todo performance can probably be improved by running less iterations
 */
export function parse(styleObject: StyleObject, componentVariantId: string | void): string {
  const parentClasses = componentVariantId ? [`.${componentVariantId}`] : []
  const rules = parseStyleObject(styleObject, parentClasses)
  const componentSheet = parseStyleItems(rules)
  const componentSheetCss = componentSheetToString(componentSheet)

  return componentSheetCss
}
