import { parse } from './parser'
import { StyleObject } from './types'

export function createStyleTag(styleObject: StyleObject, componentVariantId: string) {
  const styleString = parse(styleObject, componentVariantId)
  const parent = document.head
  const style = document.querySelector(`[panache-id="${componentVariantId}"]`)
    || document.createElement('style')
  style.setAttribute('panache-id', componentVariantId)
  style.textContent = styleString
  parent.appendChild(style)
}

export function removeStyleTag(componentVariantId: string) {
  const el = document.querySelector(`[panache-id="${componentVariantId}"]`)
  if (el) el.remove()
}
