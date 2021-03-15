/* eslint-disable no-param-reassign */
import type { AlternativeProps, ValueMappings } from './index'
import type { AdditionalProperties } from '../prefixer'

const alternativeValues: ValueMappings = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
}

const alternativeProps: AlternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines',
  flexGrow: 'WebkitBoxFlex',
}

export default function flexboxOld(
  property: string,
  value: any,
  style: AdditionalProperties,
): void {
  if (property === 'flexDirection' && typeof value === 'string') {
    if (value.indexOf('column') > -1) {
      style.WebkitBoxOrient = 'vertical'
    } else {
      style.WebkitBoxOrient = 'horizontal'
    }
    if (value.indexOf('reverse') > -1) {
      style.WebkitBoxDirection = 'reverse'
    } else {
      style.WebkitBoxDirection = 'normal'
    }
  }
  if (Object.prototype.hasOwnProperty.call(alternativeProps, property)) {
    style[alternativeProps[property]] = alternativeValues[value] || value
  }
}
