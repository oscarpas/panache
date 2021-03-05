import { createComponent, extendComponent } from './factory'
import { StyleGenerator, StyleObject } from '@panache/core/src/types'
import htmlTags from './utils/htmlTags'

const panache = {
	// All HTML tags as Component creators
	...htmlTags.reduce((acc, tag) =>
		({ ...acc, [tag]: (style: StyleObject | StyleGenerator) => createComponent(tag, style) }), {}),
	extend: extendComponent
}

export { createGlobalStyle } from './sheet'
export { PanacheProvider, PanacheContext } from './provider'
export default panache