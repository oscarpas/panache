/* eslint-disable no-param-reassign */
import type { AlternativeProps, ValueMappings } from './index'
import type { AdditionalProperties } from '../prefixer'

const alternativeValues: ValueMappings = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
}

const alternativeProps: AlternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msFlexPreferredSize',
}

// Full expanded syntax is flex-grow | flex-shrink | flex-basis.
const flexShorthandMappings: ValueMappings = {
  auto: '1 1 auto',
  inherit: 'inherit',
  initial: '0 1 auto',
  none: '0 0 auto',
  unset: 'unset',
}

const isUnitlessNumber = /^\d+(\.\d+)?$/

export default function flexboxIE(
  property: string,
  value: any,
  style: AdditionalProperties,
): void {
  if (Object.prototype.hasOwnProperty.call(alternativeProps, property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value
  }
  if (property === 'flex') {
    // For certain values we can do straight mappings based on the spec
    // for the expansions.
    if (Object.prototype.hasOwnProperty.call(flexShorthandMappings, value)) {
      style.msFlex = flexShorthandMappings[value]
      return
    }
    // Here we have no direct mapping, so we favor looking for a
    // unitless positive number as that will be the most common use-case.
    if (isUnitlessNumber.test(value)) {
      style.msFlex = `${value} 1 0%`
      return
    }

    // The next thing we can look for is if there are multiple values.
    const flexValues = value.split(/\s/)
    // If we only have a single value that wasn't a positive unitless
    // or a pre-mapped value, then we can assume it is a unit value.
    switch (flexValues.length) {
      case 1:
        style.msFlex = `1 1 ${value}`
        return
      case 2:
        // If we have 2 units, then we expect that the first will
        // always be a unitless number and represents flex-grow.
        // The second unit will represent flex-shrink for a unitless
        // value, or flex-basis otherwise.
        if (isUnitlessNumber.test(flexValues[1])) {
          style.msFlex = `${flexValues[0]} ${flexValues[1]} 0%`
        } else {
          style.msFlex = `${flexValues[0]} 1 ${flexValues[1]}`
        }
        return
      default:
        style.msFlex = value
    }
  }
}
