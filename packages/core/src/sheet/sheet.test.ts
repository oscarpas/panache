/**
 * @jest-environment jsdom
 */

import Sheet from '../sheet/sheet'

const styleId = 'p123'
const styleObject = { color: 'red' }
const globalStyle = { body: { color: 'red' } }
const globalId = 'global'

/**
 * @todo: test server/client
 */
describe('sheet add method', () => {
  let sheet

  beforeEach(() => {
    sheet = new Sheet()
  })

  it('saves style to sheet', () => {
    sheet.add(styleObject, styleId)
    const savedStyle = sheet.sheet[styleId]
    const expected = `.${styleId}{color:red}`
    expect(savedStyle).toEqual(expected)
  })

  it('injects component styles into dom correctly', () => {
    sheet.add(styleObject, styleId)
    const savedStyle = sheet.sheet[styleId]
    const domEl = document.querySelector(`[panache-id=${styleId}]`)
    expect(domEl.innerHTML).toEqual('.p123{color:red}')
  })

  it('injects global styles into dom correctly', () => {
    sheet.add(globalStyle, globalId, true)
    const savedStyle = sheet.sheet[globalId]
    const domEl = document.querySelector(`[panache-id=${globalId}]`)
    expect(domEl.innerHTML).toEqual('body{color:red}')
  })

  it(`doesn't add styles if component variation id already exists`, () => {
    sheet.add(styleObject, styleId)
    sheet.add({ color: 'green'}, styleId)
    const savedStyle = sheet.sheet[styleId]
    expect(savedStyle).toEqual(`.${styleId}{color:red}`)
  })
})

describe('sheet get method', () => {
  let sheet

  beforeEach(() => {
    sheet = new Sheet()
    sheet.add(globalStyle, globalId, true)
    sheet.add(styleObject, styleId)
  })

  it('returns entire sheet', () => {
    const allStyles = sheet.get()
    expect(Object.keys(allStyles).length).toEqual(2)
    expect(allStyles[styleId]).toEqual('.p123{color:red}')
    expect(allStyles[globalId]).toEqual('body{color:red}')
  })

  it('returns a single component style', () => {
    const componentStyle = sheet.get(styleId)
    expect(componentStyle).toEqual('.p123{color:red}')
  })
})