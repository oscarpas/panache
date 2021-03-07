/**
 * @jest-environment jsdom
 */

import camelToDash from './string'

describe('camelToDash', () => {
  it('converts camel cased to dashes', () => {
    expect(camelToDash('loremIpsumDolor')).toEqual('lorem-ipsum-dolor')
  })
})