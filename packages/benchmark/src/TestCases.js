import * as React from 'react'
import panache from 'panache-react'
import styled from 'styled-components'

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

const PanacheTest = panache.div(({ depth, i }) => ({
	display: 'flex',
	flexDirection: i % 2 ? 'column' : 'row',
	background: colors[(depth + i) % colors.length],
	padding: '4px',
	margin: '4px'
}))

const StyledTest = styled.div`
	display: flex;
	flex-direction: ${({ i }) => i % 2 ? 'column' : 'row'};
	background: ${({ depth, i }) => colors[(depth + i) % colors.length]};
	padding: 4px;
	margin: 4px;
`

export function TreePanache({ breadth = 2, depth = 7, i = 0 }) {
	return breadth > 0 && depth > 0 ? (
		<PanacheTest i={i} depth={depth}>
			{Array.from({ length: breadth }).map((_, i) => (
				<TreePanache
					key={`${breadth}-${depth}-${i}`}
					breadth={breadth}
					depth={depth - 1}
					i={i}
				/>
			))}
		</PanacheTest>
	) : null
}

export function TreeStyled({ breadth = 2, depth = 7, i = 0 }) {
	return breadth > 0 && depth > 0 ? (
		<StyledTest i={i} depth={depth}>
			{Array.from({ length: breadth }).map((_, i) => (
				<TreeStyled
					key={`${breadth}-${depth}-${i}`}
					breadth={breadth}
					depth={depth - 1}
					i={i}
				/>
			))}
		</StyledTest>
	) : null
}

export default {
	TreePanache: { component: TreePanache, props: {} },
	TreeStyledComponents: { component: TreeStyled, props: {} },
}
