const prefixes = ['-webkit-', '-moz-']

const values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true,
}

export default function cursor(property: string, value: any): Array<string> | void {
  if (property === 'cursor' && Object.prototype.hasOwnProperty.call(values, value)) {
    return prefixes.map((prefix) => prefix + value)
  }
  return undefined
}
