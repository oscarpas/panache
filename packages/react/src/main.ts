import { createElement }from './factory'
import { StyleGenerator, StyleObject } from './types'
import htmlTags from './utils/htmlTags'
export { PanacheProvider, PanacheContext } from './provider'

const panache = {
	// All HTML tags as Component creators
	...htmlTags.reduce((acc, tag) =>
		({ ...acc, [tag]: (style: StyleObject | StyleGenerator) => createElement(tag, style) }), {}),
}

export default panache