import panache from '@panache/react'
import { Sidebar } from '../Sidebar/Sidebar'

const Container = panache.div({
  display: 'flex',
  flexWrap: 'wrap',
})

const SidebarContainer = panache.aside(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  borderRight: theme.borders.thin,
}))

const MainContainer = panache.main({
  flexGrow: '1'
})

const Main = panache.div({
  maxWidth: '768px',
  margin: '2rem auto',
})

export const Layout = ({ children }) => {
  return <Container>
    <SidebarContainer>
      <Sidebar />
    </SidebarContainer>
    <MainContainer>
      <Main>
        {children}
      </Main>
    </MainContainer>
  </Container>
}