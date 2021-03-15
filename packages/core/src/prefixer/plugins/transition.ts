/* eslint-disable no-param-reassign */
import { hyphenateStyleName } from '../../utils/css'
import { capitalizeString } from '../../utils/string'
import type { AdditionalProperties } from '../prefixer'
import type { MetaData } from '../data'

const properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true,
}

interface PrefixMapping {
  [key: string]: string
}

const prefixMapping: PrefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-',
}

function prefixValue(value: string, propertyPrefixMap: MetaData): string {
  // only split multi values, not cubic beziers
  const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

  for (let i = 0, len = multipleValues.length; i < len; ++i) {
    const singleValue = multipleValues[i]
    const values = [singleValue]
    const propPrefixEntries = Object.keys(propertyPrefixMap)
    for (let k = 0; k < propPrefixEntries.length; k++) {
      const property = propPrefixEntries[k]
      const dashCaseProperty = hyphenateStyleName(property)

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        const prefixes = propertyPrefixMap[property]
        for (let j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(
            singleValue.replace(
              dashCaseProperty,
              prefixMapping[prefixes[j]] + dashCaseProperty,
            ),
          )
        }
      }
    }

    multipleValues[i] = values.join(',')
  }

  return multipleValues.join(',')
}

export default function transition(
  property: string,
  value: any,
  style: AdditionalProperties,
  propertyPrefixMap: MetaData,
): void {
  if (typeof value === 'string' && Object.prototype.hasOwnProperty.call(properties, property)) {
    const outputValue = prefixValue(value, propertyPrefixMap)
    const webkitOutput = outputValue
      .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
      .filter((val) => !/-moz-|-ms-/.test(val))
      .join(',')
    const mozOutput = outputValue
      .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
      .filter((val) => !/-webkit-|-ms-/.test(val))
      .join(',')

    style[`Webkit${capitalizeString(property)}`] = webkitOutput
    style[`Moz${capitalizeString(property)}`] = mozOutput
  }
}
