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

export const metadata: Metadata = {
  title: '바로 BaLaw',
  description: 'AI 기술을 활용하여 법률 정보의 문턱을 낮추는 "내 손안의 법률 비서"',
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
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR" suppressHydrationWarning>
      <body className={`${appleSD.className} antialiased`}>
        <ServerUserProvider>
          <ThemeProvider enableSystem>
            <Toaster />
            <Header />
            <main className="w-full min-h-[calc(100vh-50px)] pt-[70px]">{children}</main>
            <Footer />
          </ThemeProvider>
        </ServerUserProvider>

        <ConfirmAlert />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
