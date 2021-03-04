import { StyleObject } from './types'
import sortBy from 'lodash-es/sortBy'

const camelToDash = (str: string): string =>
  str.replace(/([A-Z])/g, ($1) => "-"+$1.toLowerCase())

interface StyleItem {
  selector: string,
  values: [cssProperty: string, cssValue: string],
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
  let rules = []

  for (let i = 0; i < entries.length; i++) {
    const [ key, style ] = entries[i]

    // If style is an array it means it's a responsive variable
    if (Array.isArray(style)) {
      const property = key

      // Push each responsive value as rules
      for (let j = 0; j < style.length; j++) {
        // Skip this iteration if value isn't valid
        if (typeof style[j] !== 'string' && !Array.isArray(style[j])) continue

        const selector = parentClasses.join(' ').replace(' &', '')

        // If the value is a string it's the default value of the responsive variable
        if (typeof style[j] === 'string') rules.push({
          selector,
          values: [property, style[j]],
          media: undefined
        })

        // Otherwise it's a value bound to a media query in this form: [media, value]
        else rules.push({
          selector,
          values: [property, style[j][1]],
          media: style[j][0]
        })
      }
    }

    // Recursively parse if style is an object
    else if (typeof style === 'object') {
      const isMediaObject = key.includes('@media')
      // Add media rule to object if current object is media,
      // or if inherited from parent
      const currentMediaRule = isMediaObject ? key : mediaRule
        ? mediaRule : undefined

      // Don't add current key as class if it's a media object
      const currentClass = isMediaObject ? [] : [key]
      const classes = [...parentClasses, ...currentClass]
      rules.push(...parseStyleObject(style, classes, currentMediaRule))
    }

    // If it's not an object we can add it as a StyleItem
    else {
      rules.push({
        selector: parentClasses.join(' ').replace(' &', ''),
        values: entries[i],
        media: mediaRule
      })
    }
  }

  return rules
}

type ComponentSheet = {
  [key: string]: any
}

export function parse(styleObject: StyleObject, componentVariantId: string | void): string {
  const parentClasses = componentVariantId ? [`.${componentVariantId}`] : []
  const rulesDef = parseStyleObject(styleObject, parentClasses)
  // Put rules with media queries at the end
  const rules = sortBy(rulesDef, r => r.media !== undefined)
  let componentSheet = {} as ComponentSheet

  // Group CSS rules by selector and media query
  for (let i = 0; i < rules.length; i++) {
    const { media, selector } = rules[i]
    const [cssProperty, cssValue] = rules[i].values
    const cssString = `${camelToDash(cssProperty)}:${cssValue}`

    componentSheet[media || selector] = !media
      ? [
        ...componentSheet[selector] || [],
        cssString
      ]
      : {
        ...componentSheet[media],
        [selector]: [ 
          ...componentSheet?.[media]?.[selector] || [],
          cssString
        ]
      }
  }

  // Convert component sheet to string
  const componentSheetToString = (sheet: object): string => Object
    .entries(sheet)
    .map(([key, values]) => {
      if (!Array.isArray(values)) return `${key}{${componentSheetToString(values)}}`
      return `${key}{${values.join(';')}}`
    })
    .join(' ')

  return componentSheetToString(componentSheet)
}