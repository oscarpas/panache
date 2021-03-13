import { PanacheProvider } from 'panache-react'
import { Layout } from '../components/Layout/Layout'
import {MDXProvider} from '@mdx-js/react'
import { Heading1, Heading2, Heading3, } from '../components/Typography/Typography'
import { Ul } from '../components/Elements/Elements'
import CodeBlock from '../components/CodeBlock/CodeBlock'
import GlobalStyle from '../style/global'
import { media, theme } from '../style/constants'
import { Button } from '../components/Button/Button'
import Head from 'next/head'

const components = {
  p: props => <p {...props}/>,
  h1: props => <Heading1 {...props}/>,
  h2: props => <Heading2 {...props}/>,
  h3: props => <Heading3 {...props}/>,
  pre: props => <CodeBlock {...props} />,
  ul: props => <Ul {...props} />,
  button: props => <Button {...props} />
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="theme-color" content="#ffffff" />
        <title>Panache.js</title>
      </Head>
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