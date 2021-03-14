interface FlexValues {
  [cssProperty: string]: Array<string>
}

const values: FlexValues = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex'],
  'inline-flex': [
    '-webkit-inline-box',
    '-moz-inline-box',
    '-ms-inline-flexbox',
    '-webkit-inline-flex',
  ],
}

export default function flex(property: string, value: any): Array<string> | void {
  if (property === 'display' && Object.prototype.hasOwnProperty.call(values, value)) {
    return values[value]
  }
  return undefined
}
