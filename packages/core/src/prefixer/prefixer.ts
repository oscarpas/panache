import plugins from './plugins'
import metaData from './data'

export function prefixValue(
  property: string,
  value: any,
): Array<any> {
  const additionalProperties = {}

  for (let i = 0, len = plugins.length; i < len; ++i) {
    const processedValue = plugins[i](property, value, additionalProperties, metaData)

    // we can stop processing if a value is returned
    // as all plugin criteria are unique
    if (processedValue) {
      return [processedValue, additionalProperties]
    }
  }

  return [undefined, additionalProperties]
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function prefixProperty(
  property: string,
  style: Object,
): void {
  if (metaData.hasOwnProperty(property)) {
    const newStyle = {}
    const requiredPrefixes = metaData[property]
    const capitalizedProperty = capitalizeString(property)
    const keys = Object.keys(style)
    for (let i = 0; i < keys.length; i++) {
      const styleProperty = keys[i]
      if (styleProperty === property) {
        for (let j = 0; j < requiredPrefixes.length; j++) {
          newStyle[requiredPrefixes[j] + capitalizedProperty] = style[property]
        }
      }
      newStyle[styleProperty] = style[styleProperty]
    }
    return newStyle
  }
  return style
}
