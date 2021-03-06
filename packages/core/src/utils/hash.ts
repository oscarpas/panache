/**
 * String hashing function based on Daniel J. Bernstein's popular 'times 33' hash algorithm.
 */
export function hash(text: string): number {
  let hash = 5381
  let index = text.length

  while (index) {
    hash = (hash * 33) ^ text.charCodeAt(--index)
  }

  return hash >>> 0
}