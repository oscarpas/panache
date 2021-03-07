import { parse } from '../parser/parser'
import { StyleObject, StyleSheet } from '../types'

export class Sheet {
  sheet: StyleSheet

  constructor() {
    this.sheet = {}
  }

  /**
   * @todo right now all styles are re-injected on client side render,
   * instead we should rehydrate the sheet with the existing component styles
   */
  rehydrate() {
  }

  /**
   * Inject a components style into the dom
   */
  inject(css: string, componentVariantId: string): void {
    const parent = document.head
    const style = document.querySelector(`[panache-id="${componentVariantId}"]`)
      || document.createElement('style')
    style.setAttribute('panache-id', componentVariantId)
    style.textContent = css
    parent.appendChild(style)
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
    if (this.sheet[componentVariantId]) return

    const isServerSide = typeof window === 'undefined'
    const css = parse(styleObject, isGlobal ? undefined : componentVariantId)

    this.sheet = {
      ...this.sheet,
      [componentVariantId]: css
    }

    if (!isServerSide) this.inject(css, componentVariantId)
  }

  /**
   * Return entire sheet or styles of a single component
   */
  get(componentVariantId?: string) {
    if (componentVariantId) return this.sheet[componentVariantId]
    return this.sheet
  }
}