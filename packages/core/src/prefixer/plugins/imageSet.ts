// http://caniuse.com/#feat=css-image-set
const prefixes = ['-webkit-']

export default function imageSet(property: string, value: any): Array<string> | void {
  if (typeof value === 'string' && value.indexOf('image-set(') > -1) {
    return prefixes.map((prefix) => value.replace(/image-set\(/g, `${prefix}image-set(`))
  }
  return undefined
}
