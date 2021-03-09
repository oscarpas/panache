import panache from '@panache/react'
import navIndex from '../../constants/nav'
import { ArrowRight } from '../Icons/Icons'
import Link from 'next/link'

const Container = panache.nav({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '3rem 0'
})

const PaginationItem = panache.div(({ theme }) => ({
  width: '50%',
  display: 'flex',
  flexGrow: 1,
  fontWeight: 500,
  a: {
    color: theme.colors.grayMedium,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  }
}))

const Prev = panache.extend(PaginationItem)({
  textAlign: 'left',
  svg: {
    marginRight: '1rem',
    transform: 'rotate(180deg)',
  }
})

const Next = panache.extend(PaginationItem)({
  textAlign: 'right',
  justifyContent: 'flex-end',
  svg: {
    marginLeft: '1rem',
  }
})

export const Pagination = ({ currentPath }) => {
  const flat = navIndex.map(item => item.children).flat()
  const [prev, next]= flat.reduce((acc, curr, i) => {
    if (curr?.path !== currentPath) return acc 
    return [flat[i - 1], flat[i + 1]]
  }, [])

  return <Container>
    {prev?.path && <Prev>
      <Link href={prev.path}>
        <a>
          <ArrowRight />
          {prev.label}
        </a>
      </Link>
    </Prev>}
    {next?.path && <Next>
      <Link href={next.path}>
        <a>
          {next.label}
          <ArrowRight />
        </a>
      </Link>
    </Next>}
  </Container>
}