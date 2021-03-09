import { useState } from 'react'
import panache from 'panache-react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import navIndex from '../../constants/nav'
import { useRouter } from 'next/router'
import { Pagination} from '../Pagination/Pagination'

const Container = panache.div({
  display: 'flex',
  flexWrap: 'wrap',
})

const SidebarContainer = panache.aside(({ theme, media, mobileMenuVisible }) => ({
  width: '100%',
  maxWidth: '300px',
  borderRight: theme.borders.faint,
  backgroundColor: theme.colors.background,
  transition: 'left 0.2s ease',
  willChange: 'left',
  overflowX: 'scroll',
  [media.small]: {
    position: 'fixed',
    maxWidth: 'none',
    width: '85vw',
    left: mobileMenuVisible ? '0' : '-85vw',
    height: '100vh',
  },

}))

const MainContainer = panache.main(({ media }) => ({
  flexGrow: '1',
  maxWidth: '768px',
  margin: '2rem auto',
  width: '100%',
  [media.small]: {
    padding: '20px',
    margin: 0,
  }
}))

export const Layout = ({ children }) => {
  const router = useRouter()
  const pathname = router?.pathname
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const toggleMobileMenu = ev => setMobileMenuVisible(!mobileMenuVisible)

  return <Container>
    <Header toggleMobileMenu={toggleMobileMenu} />
    <SidebarContainer mobileMenuVisible={mobileMenuVisible}>
      <Sidebar
        currentPath={pathname}
        sidebarIndex={navIndex}
        toggleMobileMenu={toggleMobileMenu}
      />
    </SidebarContainer>
    <MainContainer>
      {children}
      <Pagination currentPath={pathname} />
      <Footer currentPath={pathname} />
    </MainContainer>
  </Container>
}