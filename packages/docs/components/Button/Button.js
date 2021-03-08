import panache from '@panache/react'

export const Button = panache.button(({ theme, primary }) => ({
  background: primary ? theme.colors.primary : 'transparent',
  border: theme.borders.strong,
  fontSize: '1rem',
  borderRadius: theme.borderRadius,
  cursor: 'pointer',
  fontWeight: primary ? 600 : 500,
  marginTop: '2.5rem',
  '&:not(:first-of-type)': {
    marginLeft: '1rem',
  },
  a: {
    textDecoration: 'none',
    color: primary ? theme.colors.background : theme.colors.primary,
    display: 'inline-block',
    padding: '10px 20px',
  }
}))