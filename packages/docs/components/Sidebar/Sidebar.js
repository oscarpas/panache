import panache from '@panache/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const sidebarIndex = [
  { 
    label: 'Panache', 
    path: '/'
  },
  { 
    label: 'Documentation', 
    children: [
      {
        label: 'Get started', 
        path: '/docs/get-started'
      },
      {
        label: 'Extend styles', 
        path: '/docs/extend-styles'
      },
      {
        label: 'Theme and media queries', 
        path: '/docs/theme-media'
      },
      {
        label: 'Responsive variables', 
        path: '/docs/responsive-variables'
      },
      {
        label: 'Global styles', 
        path: '/docs/global'
      },
      {
        label: 'Server side rendering', 
        path: '/docs/ssr'
      },
    ]
  },
  { 
    label: 'API Reference', 
    path: '/api-ref'
  },
]

const Container = panache.div(({ theme }) => ({
  padding: '1rem',
  color: theme.colors.grayMedium,
}))

const ListContainer = panache.ul(({}) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  ul: {
    margin: '0 0 0 1.25rem'
  }
}))

const List = ({ listItems }) => {
  const { pathname } = useRouter()

  return <ListContainer>
    {listItems.map(item => <ListItem key={item.label} isCurrent={item.path === pathname}>
      {item.path && <Link href={item.path}>
        <a>
          <Label>
            {item.label}
          </Label>
        </a>
      </Link>}
      {!item.path && <Label>{item.label}</Label>}
      {item.children && <List listItems={item.children} />}
    </ListItem>)}
  </ListContainer>
}


const Label = panache.span({
  display: 'block',
  padding: '0.5rem 0.75rem',
})

const ListItem = panache.li(({ theme, isCurrent }) => ({
  borderRadius: theme.borderRadius,
  ... isCurrent && {
    backgroundColor: theme.colors.grayLight,
    color: theme.colors.primary,
    fontWeight: 600,
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  }
}))

export const Sidebar = ({}) => {

  return <Container>
    <List listItems={sidebarIndex} />
  </Container>
}