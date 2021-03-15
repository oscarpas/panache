import calc from './calc'

describe('calc', () => {
  const defaultValue = 'calc(100% + 10px)'

  it('prefixes correctly', () => {
    const prefixed = calc('width', defaultValue)
    expect(prefixed.includes(`-webkit-${defaultValue}`)).toBe(true)
    expect(prefixed.includes(`-moz-${defaultValue}`)).toBe(true)
  })
})
