import type { StyleGenerator, StyleObject } from 'panache-core/src/types'
import { createComponent, extendComponent } from './factory/factory'
import htmlTags from './utils/htmlTags'

const panache = {
  ...htmlTags.reduce((acc, tag) => (
    { ...acc, [tag]: (style: StyleObject | StyleGenerator) => createComponent(tag, style) }
  ), {}),
  extend: extendComponent,
}

export { getServerSheet } from './sheet/sheet'
export { createGlobalStyle } from './factory/factory'
export { PanacheProvider, PanacheContext } from './provider/provider'
export default panache
