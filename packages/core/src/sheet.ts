import { parse } from './parser'
import { StyleObject, StyleSheet } from './types'

export function createStyleTag(
  styleObject: StyleObject,
  componentVariantId: string,
  isGlobal?: boolean
) {
  const css = parse(styleObject, isGlobal ? undefined : componentVariantId)
  const parent = document.head
  const style = document.querySelector(`[panache-id="${componentVariantId}"]`)
    || document.createElement('style')
  style.setAttribute('panache-id', componentVariantId)
  style.textContent = css
  parent.appendChild(style)
}

export class Sheet {
  sheet: StyleSheet

  constructor(sheet: StyleSheet | void) {
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
   * – Component style is cached in this class
   *   If this is called and the component variant already exists it'll not be re-added
   * – A style tag is injected if this is called on the client side
   */
  add(styleObject: StyleObject, componentVariantId: string, isGlobal?: boolean) {
    const isServerSide = typeof window === 'undefined'

    if (this.sheet[componentVariantId]) return

    this.sheet = {
      ...this.sheet,
      [componentVariantId]: styleObject
    }

    if (!isServerSide) createStyleTag(styleObject, componentVariantId, isGlobal)
  }

  get(componentVariantId?: string) {
    if (componentVariantId) return this.sheet[componentVariantId]
    return this.sheet
  }
}