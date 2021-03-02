import panache from '@panache/react'

export const Ul = panache.ul(({}) => ({
  listStyle: 'disc',
  marginLeft: '1.5rem',
  '&:not(:first-child)': {
    marginTop: '1.5rem',
  }
}))