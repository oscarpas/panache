import cursor from './cursor'

describe('cursor', () => {
  const defaultValues = ['grab', 'grabbing', 'zoom-in', 'zoom-out']

  it('prefixes correctly', () => {
    defaultValues.forEach(value => {
      const prefixed = cursor('cursor', value)
      expect(prefixed.includes(`-webkit-${value}`)).toBe(true)
      expect(prefixed.includes(`-moz-${value}`)).toBe(true)
    })
  })
})
