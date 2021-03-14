const prefixes = ['-webkit-', '-moz-']

export default function calc(property: string, value: any): Array<string> | void {
  if (typeof value === 'string' && value.indexOf('calc(') > -1) {
    return prefixes.map((prefix) => value.replace(/calc\(/g, `${prefix}calc(`))
  }
  return undefined
}
