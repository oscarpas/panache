import panache from 'panache-react'
import Link from 'next/link'
import Head from 'next/head'
import List from './List'

const ListItemContainer = panache.li(({ theme, isCurrent }) => ({
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

const Label = panache.span({
  display: 'block',
  padding: '0.5rem 0.75rem',
})

const ListItem = ({ item, currentPath, toggleMobileMenu }) => {
  const isCurrent = item.path === currentPath

  return <ListItemContainer isCurrent={isCurrent}>
    {isCurrent && <Head>
      <title>{`Panache – ${item.label}`}</title>
    </Head>}
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
  </ListItemContainer>
}

export default ListItem
