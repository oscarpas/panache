/* @flow */
import { isPrefixedValue } from '../../utils/css'

const prefixes = ['-webkit-', '-moz-']
const values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/gi

export default function gradient(property: string, value: any): ?Array<string> {
  if (
    typeof value === 'string' &&
    !isPrefixedValue(value) &&
    values.test(value)
  ) {
    return prefixes.map(prefix => value.replace(values, grad => prefix + grad))
  }
}
