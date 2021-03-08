import { StyleGenerator, StyleObject } from '@panache/core/src/types'
import { createComponent, extendComponent } from './factory'
import htmlTags from './utils/htmlTags'

const panache = {
  ...htmlTags.reduce((acc, tag) => (
    { ...acc, [tag]: (style: StyleObject | StyleGenerator) => createComponent(tag, style) }
  ), {}),
  extend: extendComponent,
}

export { getServerSheet } from './sheet'
export { createGlobalStyle } from './factory'
export { PanacheProvider, PanacheContext } from './provider'
export default panache