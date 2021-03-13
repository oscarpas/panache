function camelToDash(str: string): string {
  return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
}

export function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default camelToDash
