const regex = /-webkit-|-moz-|-ms-/

export function isPrefixedValue(value: string): boolean {
  return typeof value === 'string' && regex.test(value)
}

function toHyphenLower(match: string):string {
  return `-${match.toLowerCase()}`
}

interface Cache {
  [name: string]: string
}

const cache: Cache = {}
const uppercasePattern = /[A-Z]/g
const msPattern = /^ms-/

/**
 * https://github.com/rexxars/hyphenate-style-name
 */
export function hyphenateStyleName(name: string) {
  if (Object.prototype.hasOwnProperty.call(cache, name)) {
    return cache[name]
  }

  const hName = name.replace(uppercasePattern, toHyphenLower)
  const hNameSafe = msPattern.test(hName) ? `-${hName}` : hName
  cache[name] = hNameSafe

  return hNameSafe
}
