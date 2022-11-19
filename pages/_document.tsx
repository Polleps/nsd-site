import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText, HTML_THEME_COLOR } from '../stitches.config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="nl">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={HTML_THEME_COLOR} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
