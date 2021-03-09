import panache from '@panache/react'
import Link from 'next/link'

const Container = panache.div(({ theme }) => ({
  padding: '1rem',
  color: theme.colors.grayMedium,
}))

export const Sidebar = ({ sidebarIndex, currentPath, toggleMobileMenu }) => {
  return <Container>
    <List
      listItems={sidebarIndex}
      currentPath={currentPath}
      toggleMobileMenu={toggleMobileMenu}
    />
  </Container>
}

const ListContainer = panache.ul(({}) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  ul: {
    margin: '0 0 0 1.25rem'
  }
}))

const List = ({ listItems, currentPath, toggleMobileMenu }) => {
  return <ListContainer>
    {listItems.map(item => <ListItem key={item.label} isCurrent={item.path === currentPath}>
      {item.path && <Link href={item.path}>
        <a onClick={toggleMobileMenu}>
          <Label>
            {item.label}
          </Label>
        </a>
      </Link>}
      {!item.path && <Label>{item.label}</Label>}
      {item.children && <List
        listItems={item.children}
        currentPath={currentPath}
        toggleMobileMenu={toggleMobileMenu}
      />}
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