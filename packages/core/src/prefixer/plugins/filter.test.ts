import filter from './filter'

describe('filter', () => {
  const defaultValue = 'filter(blur 10px)'

  it('prefixes correctly', () => {
      const prefixed = filter('filter', defaultValue)
      expect(prefixed.includes(`-webkit-${defaultValue}`)).toBe(true)
  })
})
