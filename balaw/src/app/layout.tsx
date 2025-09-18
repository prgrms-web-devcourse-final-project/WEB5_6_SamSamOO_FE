import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "삼삼오오",
  description: "AI 변호사",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body>{children}</body>
    </html>
  );
}
