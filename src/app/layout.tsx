import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import '../styles/styles.css';
import localFont from 'next/font/local';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/provider/ThemeProvider';
import ServerUserProvider from '@/components/provider/ServerUserProvider';
import { Toaster } from 'sonner';
import ConfirmAlert from '@/components/ui/ConfirmAlert';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export const metadata: Metadata = {
  title: '바로 BaLaw',
  description: 'AI 기술을 활용하여 법률 정보의 문턱을 낮추는 "내 손안의 법률 비서"',
  openGraph: {
    title: '바로 BaLaw',
    description: 'AI 기술을 활용하여 법률 정보의 문턱을 낮추는 "내 손안의 법률 비서',
    url: 'https://www.trybalaw.com/',
    siteName: '바로 BaLaw',
    images: [
      {
        url: 'https://www.trybalaw.com/images/og-balaw.png',
        width: 1200,
        height: 630,
        alt: '바로 BaLaw',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '바로 | BaLaw',
    description: 'AI 기술로 법률 정보의 문턱을 낮추는 내 손안의 법률 비서',
    images: ['https://www.trybalaw.com/images/og-balaw.png'],
  },
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/images/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/images/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
  },
};

export const appleSD = localFont({
  src: [
    { path: '../../public/fonts/AppleSDGothicNeo-Black.woff2', weight: '900' },
    {
      path: '../../public/fonts/AppleSDGothicNeo-ExtraBold.woff2',
      weight: '800',
    },
    { path: '../../public/fonts/AppleSDGothicNeo-Bold.woff2', weight: '700' },
    { path: '../../public/fonts/AppleSDGothicNeo-Medium.woff2', weight: '500' },
    {
      path: '../../public/fonts/AppleSDGothicNeo-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../../public/fonts/AppleSDGothicNeo-Regular.woff2',
      weight: '400',
    },
    { path: '../../public/fonts/AppleSDGothicNeo-Light.woff2', weight: '300' },
    {
      path: '../../public/fonts/AppleSDGothicNeo-ExtraLight.woff2',
      weight: '200',
    },
    { path: '../../public/fonts/AppleSDGothicNeo-Thin.woff2', weight: '100' },
  ],
  variable: '--font-apple-sd',
  display: 'swap',
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" suppressHydrationWarning>
      <head></head>
      <body className={`${appleSD.className} antialiased`}>
        <ServerUserProvider>
          <ThemeProvider enableSystem>
            <Toaster />
            <Header />
            <main className="w-full min-h-[calc(100vh-50px)] pt-[70px]">{children}</main>
            <Footer />
            <ScrollToTopButton />
          </ThemeProvider>
        </ServerUserProvider>

        <ConfirmAlert />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
