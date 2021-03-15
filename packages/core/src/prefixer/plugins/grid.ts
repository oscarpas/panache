/* eslint-disable no-param-reassign */
import type { AdditionalProperties } from '../prefixer'

function isSimplePositionValue(value: any) {
  return typeof value === 'number' && !Number.isNaN(value)
}

function isComplexSpanValue(value: string) {
  return typeof value === 'string' && value.includes('/')
}

const alignmentValues = ['center', 'end', 'start', 'stretch']

interface DisplayValues {
  [cssValue: string]: Array<string>
}
const displayValues: DisplayValues = {
  'inline-grid': ['-ms-inline-grid'],
  grid: ['-ms-grid'],
}

interface PropertyConverters {
  [func: string]: (value: any, style: AdditionalProperties) => void
}

const propertyConverters: PropertyConverters = {
  alignSelf: (value: any, style: AdditionalProperties) => {
    if (alignmentValues.indexOf(value) > -1) {
      style.msGridRowAlign = value
    }
  },

  gridColumn: (value: any, style: AdditionalProperties) => {
    if (isSimplePositionValue(value)) {
      style.msGridColumn = value
    } else if (isComplexSpanValue(value)) {
      const [start, end] = value.split('/')
      propertyConverters.gridColumnStart(+start, style)

      const [maybeSpan, maybeNumber] = end.split(/ ?span /)
      if (maybeSpan === '') {
        propertyConverters.gridColumnEnd(+start + +maybeNumber, style)
      } else {
        propertyConverters.gridColumnEnd(+end, style)
      }
    } else {
      propertyConverters.gridColumnStart(value, style)
    }
  },

  gridColumnEnd: (value: any, style: AdditionalProperties) => {
    const { msGridColumn } = style
    if (isSimplePositionValue(value) && isSimplePositionValue(msGridColumn)) {
      style.msGridColumnSpan = value - Number(msGridColumn)
    }
  },

  gridColumnStart: (value: any, style: AdditionalProperties) => {
    if (isSimplePositionValue(value)) {
      style.msGridColumn = value
    }
  },

  gridRow: (value: any, style: AdditionalProperties) => {
    if (isSimplePositionValue(value)) {
      style.msGridRow = value
    } else if (isComplexSpanValue(value)) {
      const [start, end] = value.split('/')
      propertyConverters.gridRowStart(+start, style)

      const [maybeSpan, maybeNumber] = end.split(/ ?span /)
      if (maybeSpan === '') {
        propertyConverters.gridRowEnd(+start + +maybeNumber, style)
      } else {
        propertyConverters.gridRowEnd(+end, style)
      }
    } else {
      propertyConverters.gridRowStart(value, style)
    }
  },

  gridRowEnd: (value: any, style: AdditionalProperties) => {
    const { msGridRow } = style
    if (isSimplePositionValue(value) && isSimplePositionValue(msGridRow)) {
      style.msGridRowSpan = value - Number(msGridRow)
    }
  },

  gridRowStart: (value: any, style: AdditionalProperties) => {
    if (isSimplePositionValue(value)) {
      style.msGridRow = value
    }
  },

  gridTemplateColumns: (value: any, style: AdditionalProperties) => {
    style.msGridColumns = value
  },

  gridTemplateRows: (value: any, style: AdditionalProperties) => {
    style.msGridRows = value
  },

  justifySelf: (value: any, style: AdditionalProperties) => {
    if (alignmentValues.indexOf(value) > -1) {
      style.msGridColumnAlign = value
    }
  },
}

export default function grid(
  property: string,
  value: any,
  style: AdditionalProperties,
): Array<string> | void {
  if (property === 'display' && value in displayValues) {
    return displayValues[value]
  }

  if (property in propertyConverters) {
    const propertyConverter = propertyConverters[property]
    propertyConverter(value, style)
  }

  return undefined
}
