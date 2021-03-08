import { createGlobalStyle } from '@panache/react'
import reset from '@panache/reset'

const globalStyles = ({ theme }) => ({
  html: {
    fontFamily: theme.fonts.primary,
    color: theme.colors.primary,
    backgroundColor: theme.colors.background,
    fontSize: '16px',
    '-moz-osx-font-smoothing': 'auto',
    '-webkit-font-smoothing': 'auto',
  },
  body: {
    fontSize: '1rem',
    lineHeight: '1.75rem',
  },
  ['*, :after, :before']: {
    boxSizing: 'border-box'
  },
  a: {
    color: theme.colors.primary,
  },
  'code, kbd, pre, samp': {
    fontFamily: theme.fonts.code,
  },
  pre: {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.grayLight,
  },
  code: {
    fontSize: '.9em',
    padding: '2px .25em',
    borderRadius: '.25rem',
    color: theme.colors.grayDark,
    backgroundColor: theme.colors.grayLight,
  },
  button: {
    fontFamily: theme.fonts.primary,
  },
  strong: {
    fontWeight: 600,
  },
  'p, ul, pre': {
    '&:not(:first-child)': {
      marginTop: '1.5rem'
    }
  },
})

const GlobalStyle = createGlobalStyle(globalStyles, reset)

export default GlobalStyle