import * as React from 'react'
import { parse } from '@panache/core'
import { StyleObject } from './types'
import ReactDOMServer from 'react-dom/server'

class ServerSheet {
  sheet: Object

  constructor(sheet: Object | void) {
    this.sheet = sheet || {}
  }

  add(styleObject: StyleObject, componentVariantId: string) {
    this.sheet = {
      ...this.sheet,
      [componentVariantId]: parse(styleObject, componentVariantId)
    }
  }

  get() {
    return Object
      .entries(this.sheet)
      .map(([cssClass, cssRules]) =>
        React.createElement('style', { className: cssClass, key: cssClass }, cssRules))
  }
}

export const serverSheet = new ServerSheet()

export const collectStyles = (App: any) => {
  ReactDOMServer.renderToStaticMarkup(App)
  return App
}

export function createStyleTag(styleObject: StyleObject, componentVariantId: string) {
  // TODO check if tag with variant id already exists

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
