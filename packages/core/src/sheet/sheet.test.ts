/**
 * @jest-environment jsdom
 */

import { Sheet } from '../sheet/sheet'

const styleObject = { color: 'red' }
const styleId = 'p123'
const globalStyle = { body: { color: 'red' } }
const globalId = 'global'

describe('sheet add method', () => {
  let sheet

  beforeEach(() => {
    sheet = new Sheet()
  })

  it('saves style to sheet', () => {
    sheet.add(styleObject, styleId)
    const savedStyle = sheet.sheet[styleId]
    expect(styleObject).toMatchObject(savedStyle)
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
    expect(styleObject).toEqual(savedStyle)
  })
})

describe('sheet get method', () => {
  let sheet

  beforeEach(() => {
    sheet = new Sheet()
    sheet.add(globalStyle, globalId)
    sheet.add(styleObject, styleId)
  })

  it('returns entire sheet', () => {
    const allStyles = sheet.get()
    expect(styleObject).toMatchObject(allStyles[styleId])
    expect(globalStyle).toMatchObject(allStyles[globalId])
  })

  it('returns a single component style', () => {
    const componentStyle = sheet.get(styleId)
    expect(styleObject).toMatchObject(componentStyle)
  })
})