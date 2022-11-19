import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { globalCss, theme } from '../stitches.config';

const styles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    outlineColor: theme.colors.secondary,
  },
  'ul, ol': {
    listStyle: 'none',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  body: {
    padding: 0,
    margin: 0,
    fontFamily: '$fonts$main',
    backgroundColor: '$background',
    color: 'white',
  },
  ':root': {
    '@xsDown': {
      fontSize: '12px',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  styles();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
