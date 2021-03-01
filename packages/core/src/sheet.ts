import { parse } from './parser'
import { StyleObject } from './types'

export function createStyleTag(css: string, componentVariantId) {
  const parent = document.head
  const style = document.querySelector(`[panache-id="${componentVariantId}"]`)
    || document.createElement('style')
  style.setAttribute('panache-id', componentVariantId)
  style.textContent = css
  parent.appendChild(style)
}

export function removeStyleTag(componentVariantId: string) {
  const el = document.querySelector(`[panache-id="${componentVariantId}"]`)
  if (el) el.remove()
}

export class Sheet {
  sheet: Object

  constructor(sheet: Object | void) {
    this.sheet = sheet || {}
  }

  hydrate() {
    // TODO
  }

  add(styleObject: StyleObject, componentVariantId: string, isGlobal: boolean) {
    const isServerSide = typeof window === 'undefined'
    const css = parse(styleObject, isGlobal ? undefined : componentVariantId)

    this.sheet = {
      ...this.sheet,
      [componentVariantId]: css
    }

    if (!isServerSide) createStyleTag(css, componentVariantId)
  }

  get(componentVariantId) {
    if (componentVariantId) return this.sheet[componentVariantId]
    return this.sheet
  }
}