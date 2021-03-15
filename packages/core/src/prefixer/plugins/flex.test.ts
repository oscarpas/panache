import flex from './flex'

describe('flex', () => {
  const expectedFlex = ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex']
  const expectedInlineFlex = [
    '-webkit-inline-box',
    '-moz-inline-box',
    '-ms-inline-flexbox',
    '-webkit-inline-flex',
  ]

  it('prefixes flex correctly', () => {
      const prefixed = flex('display', 'flex')
      expect(prefixed).toEqual(expectedFlex)
  })

  it('prefixes inline-flex correctly', () => {
      const prefixed = flex('display', 'inline-flex')
      expect(prefixed).toEqual(expectedInlineFlex)
  })
})
