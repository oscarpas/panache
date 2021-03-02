import panache from '@panache/react'

export const Heading1 = panache.h1({
  fontWeight: 700,
  fontSize: '2.25rem',
  lineHeight: '2.5rem',
  marginTop: '.5rem',
  letterSpacing: '-.015em',
})

export const Heading2 = panache.h2({
  fontSize: '1.875rem',
  lineHeight: '2.25rem',
  marginTop: '2.5rem',
  letterSpacing: '-.015em',
  fontWeight: 600,
})

export const Heading3 = panache.h3({
  fontSize: '1.5rem',
  lineHeight: '2rem',
  marginTop: '2rem',
  letterSpacing: '-0.015em',
  fontWeight: 600,
})

export const Code = panache.code(({ theme }) => ({
}))