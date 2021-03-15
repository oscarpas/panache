import imageSet from './imageSet'

describe('imageSet', () => {
  const defaultValue = 'image-set(cat.png 1x, cat-2x.png 2x)'

  it('prefixes correctly', () => {
      const prefixed = imageSet('background-image', defaultValue)
      expect(prefixed.includes(`-webkit-${defaultValue}`)).toBe(true)
  })
})
