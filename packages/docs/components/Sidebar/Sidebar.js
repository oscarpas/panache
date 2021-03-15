import panache from 'panache-react'
import List from './List'

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
