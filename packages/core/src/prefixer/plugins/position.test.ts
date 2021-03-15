import position from './position'

describe('position', () => {
  const defaultValue = 'sticky'

  it('prefixes correctly', () => {
      const prefixed = position('position', defaultValue)
      expect(prefixed.includes(`-webkit-${defaultValue}`)).toBe(true)
  })
})
