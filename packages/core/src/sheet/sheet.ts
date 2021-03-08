import { parse } from '../parser/parser'
import { StyleObject, StyleSheet } from '../types'

/* eslint class-methods-use-this: "off" */
class Sheet {
  sheet: StyleSheet

  shouldRehydrate: boolean

  constructor() {
    this.sheet = {}
    this.shouldRehydrate = typeof window !== 'undefined'

    if (this.shouldRehydrate) this.rehydrate()
  }

  /**
   * Rehydrate sheet on the client side
   */
  rehydrate() {
    const styles = document.querySelectorAll('style[panache-id]')

    for (let i = 0; i < styles.length; i++) {
      const id = styles[i].getAttribute('panache-id')
      const css = styles[i].innerHTML

      if (!id) continue

      this.sheet = {
        ...this.sheet,
        [id]: css,
      }
    }

    this.shouldRehydrate = false
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
      [componentVariantId]: css,
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

export default Sheet