import { parseStyleObject, parseStyleItems, componentSheetToString, parse } from '../parser/parser'
import type { ResponsiveVariable, StyleObject } from '../types'

describe('parseStyleObject', () => {
  const mockedMediaQuery = '@media(min-width: 768px'
  const mockedResponsiveVar: ResponsiveVariable = ['16px', [mockedMediaQuery, '20px']]

  const mockedStyleObject: StyleObject = {
    color: 'red',
    div: {
      color: 'green'
    },
    [mockedMediaQuery]: {
      color: 'blue'
    },
    a: {
      textDecoration: 'underline'
    },
  }

  const expectedStyleItems = [
    {
      selector: '.myClass',
      values: [ 'color', 'red' ],
      media: undefined
    },
    {
      selector: '.myClass div',
      values: [ 'color', 'green' ],
      media: undefined
    },
    {
      selector: '.myClass a',
      values: [ 'textDecoration', 'underline' ],
      media: undefined
    },
    {
      selector: '.myClass',
      values: [ 'color', 'blue' ],
      media: '@media(min-width: 768px'
    }
  ]

  it('saves each css rule as a StyleItem', () => {
    const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])
    expect(styleItems.length).toEqual(expectedStyleItems.length)
  })

  it('creates correct selectors for nested items', () => {
    const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])
    expect(styleItems[1].selector).toEqual(expectedStyleItems[1].selector)
  })

  it('adds media query rule to corresponding StyleItem', () => {
    const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])
    expect(styleItems[3].selector).toEqual(expectedStyleItems[3].selector)
    expect(styleItems[3].media).toBe(expectedStyleItems[3].media)
  })

  it('adds StyleItems without media in same order as they are defined in StyleObject', () => {
    const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])
    expect(styleItems[0].values[1]).toEqual(expectedStyleItems[0].values[1])
    expect(styleItems[1].values[1]).toEqual(expectedStyleItems[1].values[1])
    expect(styleItems[2].values[1]).toEqual(expectedStyleItems[2].values[1])
  })

  it('adds StyleItems with media at the end of rules', () => {
    const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])
    const lastItem = styleItems.pop()
    expect(lastItem.media).toEqual(expectedStyleItems.pop().media)
  })

  it('prepends StyleItem selectors with parent class', () => {
    const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])
    styleItems.forEach(item => expect(item.selector).toContain('.myClass'))
  })

  it('parses default value of a responsive variable correctly', () => {
    const mockedStyleObjectResp: StyleObject = { fontSize: mockedResponsiveVar }
    const styleItems = parseStyleObject(mockedStyleObjectResp, ['.myClass'])
    expect(styleItems[0].selector).toEqual('.myClass')
    expect(styleItems[0].values).toEqual(['fontSize', '16px'])
    expect(styleItems[0].media).toBeUndefined()
  })

  it('parses responsive values of a responsive variable correctly', () => {
    const mockedStyleObjectResp: StyleObject = { fontSize: mockedResponsiveVar }
    const styleItems = parseStyleObject(mockedStyleObjectResp, ['.myClass'])
    expect(styleItems[1].selector).toEqual('.myClass')
    expect(styleItems[1].values).toEqual(['fontSize', '20px'])
    expect(styleItems[1].media).toEqual(mockedMediaQuery)
  })
})

describe('parseStyleItems', () => {
  const mockedMediaQuery = '@media(min-width: 768px'
  const mockedStyleObject: StyleObject = {
    color: 'red',
    backgroundColor: 'white',
    div: {
      color: 'green'
    },
    [mockedMediaQuery]: {
      color: 'blue',
      div: {
        color: 'purple'
      }
    },
  }

  const styleItems = parseStyleObject(mockedStyleObject, ['.myClass'])

  it('groups css rules by selector', () => {
    const componentSheet = parseStyleItems(styleItems)
    expect(componentSheet['.myClass'].length).toEqual(2)
  })

  it('converts CSS properties and values to valid CSS', () => {
    const componentSheet = parseStyleItems(styleItems)
    expect(componentSheet['.myClass']).toEqual(['color:red', 'background-color:white'])
  })

  it('groups CSS rules by media query', () => {
    const componentSheet = parseStyleItems(styleItems)
    expect(componentSheet[mockedMediaQuery]['.myClass']).toEqual(['color:blue'])
    expect(componentSheet[mockedMediaQuery]['.myClass div']).toEqual(['color:purple'])
  })
})

describe('componentSheetToString', () => {
  const mockedStyleObject: StyleObject = {
    color: 'red',
    backgroundColor: 'white',
    div: {
      color: 'green'
    }
  }

  const componentSheet =  parseStyleItems(parseStyleObject(mockedStyleObject, ['.myClass']))
  const expectedCss = '.myClass{color:red;background-color:white} .myClass div{color:green}'

  it('coverts a ComponentSheet into valid CSS', () => {
    const css = componentSheetToString(componentSheet)
    expect(css).toEqual(expectedCss)
  })
})