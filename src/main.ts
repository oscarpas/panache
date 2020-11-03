import { createElement }from './factory'
import { parse } from './parser'
import { StyleGenerator, StyleObject } from './types'
import htmlTags from './utils/htmlTags'
import { ThemeProvider, ThemeContext } from './theme'

const panache = {
	// All HTML tags as Component creators
	...htmlTags.reduce((acc, tag) =>
		({ ...acc, [tag]: (style: StyleObject | StyleGenerator) => createElement(tag, style) }), {}),

	// Theme
	ThemeProvider,
	ThemeContext
}

export default panache