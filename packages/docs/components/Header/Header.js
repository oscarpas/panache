import panache from '@panache/react'
import { Github } from '../Icons/Icons'

const Container = panache.header(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  borderBottom: theme.borders.thin,
  width: '100%',
  padding: '15px 20px',
}))

const Section = panache.div({
  display: 'flex',
  alignItems: 'center',
  flexGrow: '1',
  '&:last-of-type': {
    justifyContent: 'flex-end',
  }
})

const Title = panache.span(({ }) => ({
  fontWeight: 600,
}))

const SubTitle = panache.span(({ theme }) => ({
  color: theme.colors.grayMedium,
  marginLeft: '0.5em',
}))

export const Header = ({}) => {
  return <Container>
    <Section>
      <Title>Panache</Title>
      <SubTitle>Styled Objects Library</SubTitle>
    </Section>
    <Section>
      <a href="" target="_blank">
        <Github />
      </a>
    </Section>
  </Container>
}