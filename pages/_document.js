import Document, { Head, Main, NextScript } from "next/document";
import NavHeader from "../components/NavHeader";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
          />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <NavHeader />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
