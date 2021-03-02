import { createGlobalStyle, PanacheProvider } from '@panache/react'
import { Layout } from '../components/Layout/Layout'
import {MDXProvider} from '@mdx-js/react'
import { Heading1, Heading2, Heading3, } from '../components/Typography/Typography'
import { Ul } from '../components/Elements/Elements'
import CodeBlock from '../components/CodeBlock/CodeBlock'
import GlobalStyle from '../style/global'
import { media, theme } from '../style/constants'

const components = {
  p: props => <p {...props}/>,
  h1: props => <Heading1 {...props}/>,
  h2: props => <Heading2 {...props}/>,
  h3: props => <Heading3 {...props}/>,
  pre: props => <CodeBlock {...props} />,
  ul: props => <Ul {...props} />
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <PanacheProvider theme={theme} media={media}>
        <MDXProvider components={components}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </PanacheProvider>
    </>
  )
}