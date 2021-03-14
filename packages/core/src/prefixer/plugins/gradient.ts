const prefixes = ['-webkit-', '-moz-']
const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/gi

export default function gradient(property: string, value: any): Array<string> | void {
  if (typeof value === 'string' && values.test(value)) {
    return prefixes.map((prefix) => value.replace(values, (grad) => prefix + grad))
  }
  return undefined
}
