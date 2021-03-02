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

  /**
   * Adds a components style to the sheet
   * – The componentVariantId should be a unique id for the current state of the component,
   *   currently it's a hash of "elementTag + styleObject + props".
   *   This'll need further testing, it might not be robust enough.
   * – Component style is parsed and cached in this class
   *   If this is called and the component variant already exists it'll not be re-added
   * – A style tag is injected if this is called on the client side
   */
  add(styleObject: StyleObject, componentVariantId: string, isGlobal: boolean) {
    const isServerSide = typeof window === 'undefined'
    const css = parse(styleObject, isGlobal ? undefined : componentVariantId)

    if (this.sheet[componentVariantId]) return

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