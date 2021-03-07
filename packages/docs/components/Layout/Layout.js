import panache from '@panache/react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import navIndex from '../../constants/nav'
import { useRouter } from 'next/router'

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
  flexGrow: '1',
  maxWidth: '768px',
  margin: '2rem auto',
})

export const Layout = ({ children }) => {
  const router = useRouter()
  const pathname = router?.pathname

  return <Container>
    <Header />
    <SidebarContainer>
      <Sidebar currentPath={pathname} sidebarIndex={navIndex} />
    </SidebarContainer>
    <MainContainer>
      {children}
      <Footer currentPath={pathname} />
    </MainContainer>
  </Container>
}