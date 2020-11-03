import { StyleObject } from "./types"

const camelToDash = (str: string): string =>
  str.replace(/([A-Z])/g, ($1) => "-"+$1.toLowerCase())

/**
 * Recursively parse a StyleObject into a flat array
 * @param styleObject 
 * @param parentClasses 
 */
export function parseStyleObject(styleObject: StyleObject, parentClasses: Array<string>): Array<any>  {
  const entries = Object.entries(styleObject)
  let rules = []

  for (let i = 0; i < entries.length; i++) {
    const [ key, style ] = entries[i]

    if (typeof style === 'object')
      rules.push(...parseStyleObject(style, [...parentClasses, key]))
    else
      rules.push({ class: parentClasses.join(' ').replace(' &', ''), values: entries[i] })
  }

  return rules
}

export function parse(styleObject: StyleObject, componentVariantId: string): string {
  const rules = parseStyleObject(styleObject, [`.${componentVariantId}`])
  let componentSheet = {}

  for (let i = 0; i < rules.length; i++) {
    const className = rules[i].class
    const [property, value] = rules[i].values
    componentSheet[className] = [
      ...componentSheet[className] || [],
      `${camelToDash(property)}:${value}`
    ]
  }

  const sheetItemToString = (sheetItem: [string, Array<string>]) => 
    `${sheetItem[0]}{${sheetItem[1].join(';')}}`

  const sheetString = Object
    .entries(componentSheet)
    .map(sheetItemToString)
    .join(' ')

  return sheetString
}