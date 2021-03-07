import Document from 'next/document'
import { getServerSheet } from '@panache/react'
import ReactDOMServer from 'react-dom/server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => {
        ReactDOMServer.renderToStaticMarkup(<App {...props} />)
        return App
      },
    })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {getServerSheet()}
        </>
      ),
    }
  }
}