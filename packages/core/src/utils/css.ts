const regex = /-webkit-|-moz-|-ms-/

export function isPrefixedValue(value: string): boolean {
  return typeof value === 'string' && regex.test(value)
}

const uppercasePattern = /[A-Z]/g
const msPattern = /^ms-/
const cache = {}

function toHyphenLower(match: string):string {
  return `-${match.toLowerCase()}`
}

/**
 * https://github.com/rexxars/hyphenate-style-name
 */
export function hyphenateStyleName(name: string) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  const hName = name.replace(uppercasePattern, toHyphenLower)
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}