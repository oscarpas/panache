import { createElement } from './factory'
import { parse } from './parser'

const panache = {
	div: (props) => createElement('div', props)
}

export default panache