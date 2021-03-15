// http://caniuse.com/#search=cross-fade
const prefixes = ['-webkit-']

export default function crossFade(
  property: string,
  value: any,
): Array<string> | void {
  if (typeof value === 'string' && value.indexOf('cross-fade(') > -1) {
    return prefixes.map((prefix) => value.replace(/cross-fade\(/g, `${prefix}cross-fade(`))
  }
  return undefined
}
