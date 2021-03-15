import crossFade from './crossFade'

describe('crossFade', () => {
  const defaultValue = 'cross-fade(url(white.png) 0%, url(black.png) 100%)'

  it('prefixes correctly', () => {
    const prefixed = crossFade('background-image', defaultValue)
    expect(prefixed.includes(`-webkit-${defaultValue}`)).toBe(true)
  })
})
