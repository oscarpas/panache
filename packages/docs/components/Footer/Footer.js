import panache from 'panache-react'

const Container = panache.footer(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  color: theme.colors.grayMedium,
  fontSize: '0.875em',
  a: {
    color: theme.colors.grayMedium,
  }
}))

const Item = panache.div({
  width: '50%',
  '&:last-of-type': {
    textAlign: 'right'
  }
})

export const Footer = ({ currentPath }) => {
  const githubRepo = 'https://github.com/oscarpas/panache/tree/main/packages/docs/pages'
  const pageLink = `${githubRepo}${currentPath}.mdx` 

  return <Container>
    <Item>MIT 2021 © Panache</Item>
    <Item>
      <a href={pageLink} target="_blank">
        Edit page on Github
      </a>
    </Item>
  </Container>
}