import gradient from './gradient'

describe('gradient', () => {
  const linear = 'linear-gradient(#e66465, #9198e5)'
  const repeatingLinear = 'repeating-linear-gradient(#e66465, #e66465 20px, #9198e5 20px, #9198e5 25px)'
  const radial = 'radial-gradient(#e66465, #9198e5)'
  const repeatingRadial = 'repeating-radial-gradient(#e66465, #9198e5 20%)'

  it('prefixes linear correctly', () => {
      const prefixed = gradient('background', linear)
      expect(prefixed.includes(`-webkit-${linear}`)).toBe(true)
      expect(prefixed.includes(`-moz-${linear}`)).toBe(true)
  })

  it('prefixes radial correctly', () => {
      const prefixed = gradient('background', repeatingLinear)
      expect(prefixed.includes(`-webkit-${repeatingLinear}`)).toBe(true)
      expect(prefixed.includes(`-moz-${repeatingLinear}`)).toBe(true)
  })

  it('prefixes radial correctly', () => {
    const prefixed = gradient('background', radial)
    expect(prefixed.includes(`-webkit-${radial}`)).toBe(true)
    expect(prefixed.includes(`-moz-${radial}`)).toBe(true)
  })

  it('prefixes repeating radial correctly', () => {
    const prefixed = gradient('background', repeatingRadial)
    expect(prefixed.includes(`-webkit-${repeatingRadial}`)).toBe(true)
    expect(prefixed.includes(`-moz-${repeatingRadial}`)).toBe(true)
  })
})