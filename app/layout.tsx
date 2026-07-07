import type { Metadata, Viewport } from 'next';
import { HTML_THEME_COLOR } from '../helpers/theme';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://smash-nederland.nl'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: HTML_THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='nl'>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;500;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
