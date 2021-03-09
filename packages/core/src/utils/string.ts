function camelToDash(str: string): string {
  return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
}

export default camelToDash
