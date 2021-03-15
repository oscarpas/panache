// http://caniuse.com/#feat=css-filter-function
const prefixes = ['-webkit-']

export default function filter(property: string, value: any): Array<string> | void {
  if (typeof value === 'string' && value.indexOf('filter(') > -1) {
    return prefixes.map((prefix) => value.replace(/filter\(/g, `${prefix}filter(`))
  }
  return undefined
}
