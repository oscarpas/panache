import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Sheet } from '@panache/core'

export const sheet = new Sheet()

export function getServerSheet() {
  const sheetStyles = sheet.get()

  return Object
    .entries(sheetStyles)
    .map(([cssClass, cssRules]) =>
      React.createElement('style', { className: cssClass, key: cssClass }, cssRules))
}

export const collectStyles = (App: any) => {
  ReactDOMServer.renderToStaticMarkup(App)
  return App
}
