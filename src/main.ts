import { createElement }from './factory'
import { parse } from './parser'
import { StyleGenerator, StyleObject } from './types'
import htmlTags from './utils/htmlTags'

const panache = {
	...htmlTags.reduce((acc, tag) =>
		({ ...acc, [tag]: (style: StyleObject | StyleGenerator) => createElement(tag, style) }), {})
}

export default panache