/* @flow */
const values = {
  flex: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex'],
  'inline-flex': [
    '-webkit-inline-box',
    '-moz-inline-box',
    '-ms-inline-flexbox',
    '-webkit-inline-flex',
  ],
}

export default function flex(property: string, value: any): ?Array<string> {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return values[value]
  }
}
