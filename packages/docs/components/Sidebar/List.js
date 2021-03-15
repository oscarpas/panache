import panache from 'panache-react'
import ListItem from './ListItem'

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
    {listItems.map(item => <ListItem
      key={item.label}
      item={item}
      currentPath={currentPath}
      toggleMobileMenu={toggleMobileMenu}
    />)}
  </ListContainer>
}

export default List
