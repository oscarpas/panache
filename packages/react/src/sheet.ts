import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Sheet } from '@panache/core'
import { StyleGenerator, StyleObject } from './types'
import { PanacheContext } from './provider'

export const sheet = new Sheet()

export function createGlobalStyle(styles: StyleObject | StyleGenerator) {
  const GlobalStyle = React.forwardRef((props: React.ComponentProps<any>, ref) => {
    const context = React.useContext(PanacheContext)
    const componentStyleObject = typeof styles === 'function'
      ? styles({ ...context, ...props }) : styles

    sheet.add(componentStyleObject, 'global', true)

    return null
  })

  return GlobalStyle
}

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
