/**
 * String hashing function based on Daniel J. Bernstein's popular 'times 33' hash algorithm.
 */
function hash33(text: string): number {
  let hash = 5381
  let index = text.length

  while (index) {
    // eslint-disable-next-line
    hash = (hash * 33) ^ text.charCodeAt(--index)
  }

  // eslint-disable-next-line
  return hash >>> 0
}

export default hash33