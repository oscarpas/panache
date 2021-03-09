import panache from 'panache-react'
import { Github, Hamburger } from '../Icons/Icons'
import pkg from '../../package.json'

const Container = panache.header(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  borderBottom: theme.borders.faint,
  width: '100%',
  padding: '15px 20px',
  position: 'sticky',
  top: '0',
  backgroundColor: theme.colors.background,
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

const Version = panache.span(({ theme, media }) => ({
  color: theme.colors.grayMedium,
  fontSize: '0.875em',
  marginRight: '1em',
  [media.small]: {
    display: 'none',
  }
}))

const Action = panache.div(({ withMargin, hiddenDesktop, media }) => ({
  display: 'flex',
  textDecoration: 'none',
  ...hiddenDesktop && {
    display: 'none',
    [media.small]: {
      display: 'flex'
    },
  },
  ...withMargin && {
    marginLeft: '1em'
  }
}))

export const Header = ({ toggleMobileMenu }) => {
  return <Container>
    <Section>
      <Title>Panache</Title>
      <SubTitle>Styled Objects Library</SubTitle>
    </Section>
    <Section>
      <Action as="a" href="https://github.com/oscarpas/panache" target="_blank">
        <Version>{pkg.version}</Version>
        <Github />
      </Action>
      <Action withMargin hiddenDesktop onClick={toggleMobileMenu}>
        <Hamburger />
      </Action>
    </Section>
  </Container>
}