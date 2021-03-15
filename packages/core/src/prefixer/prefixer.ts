import plugins from './plugins'
import metaData from './data'
import { capitalizeString } from '../utils/string'

export interface AdditionalProperties {
  [cssProperty: string]: string | number
}

type PrefixedValues = Array<string> | void
type PrefixedCss = [PrefixedValues, AdditionalProperties]

/**
 * Takes a CSS property and value and returns a tuple of two:
 * - Array of additional prefixed CSS values
 * - Object with additional prefixed CSS properties and values
 *
 * Prefixer is based on: https://github.com/robinweser/inline-style-prefixer
 */
export default function prefixCss(property: string, value: any): PrefixedCss {
  const additionalProperties: AdditionalProperties = {}

  // Prefix property if needed
  if (Object.prototype.hasOwnProperty.call(metaData, property)) {
    const requiredPrefixes = metaData[property]
    const capitalizedProperty = capitalizeString(property)

    for (let i = 0; i < requiredPrefixes.length; i++) {
      additionalProperties[requiredPrefixes[i] + capitalizedProperty] = value
    }
  }

  // Prefix values if needed
  for (let i = 0, len = plugins.length; i < len; ++i) {
    const processedValue = plugins[i](property, value, additionalProperties, metaData)

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (Array.isArray(processedValue)) {
      return [processedValue, additionalProperties]
    }
  }

  return [undefined, additionalProperties]
}
