import sizing from './sizing'

describe('sizing', () => {
  const defaultValue = 'min-content'
  const properties = [
    'maxHeight',
    'maxWidth',
    'width',
    'height',
    'columnWidth',
    'minWidth',
    'minHeight',
  ]
  const values = [
    'min-content',
    'max-content',
    'fill-available',
    'fit-content',
    'contain-floats',
  ]

  it('prefixes for correct properties', () => {
    properties.forEach(prop => {
      const prefixed = sizing(prop, defaultValue)
      expect(prefixed.includes(`-webkit-${defaultValue}`)).toBe(true)
      expect(prefixed.includes(`-moz-${defaultValue}`)).toBe(true)
    })
  })

  it('prefixes for correct properties', () => {
    values.forEach(val => {
      const prefixed = sizing('width', val)
      expect(prefixed.includes(`-webkit-${val}`)).toBe(true)
      expect(prefixed.includes(`-moz-${val}`)).toBe(true)
    })
  })
})
