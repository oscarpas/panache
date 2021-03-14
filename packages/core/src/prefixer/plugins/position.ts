export default function position(property: string, value: any): Array<string> | void {
  if (property === 'position' && value === 'sticky') {
    return ['-webkit-sticky']
  }
  return undefined
}
