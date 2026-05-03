import type { Metadata } from "next";
import { Noto_Sans_SC, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "水果健康科普",
  description: "专业的健康饮食知识平台，为您提供水果营养、选购指南、健康食谱等全方位科普内容",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}