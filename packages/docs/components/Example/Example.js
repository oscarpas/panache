import panache from 'panache-react'

export const Example = panache.div(({ theme }) => ({
  marginTop: '1.5rem',
  borderRadius: theme.borderRadius,
  overflow: 'hidden'
}))
