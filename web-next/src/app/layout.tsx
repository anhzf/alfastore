import WebFooter from '@/components/web-footer';
import WebNavbar from '@/components/web-navbar';
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({ subsets: ["latin-ext"], style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <div className="flex min-h-screen flex-col">
          <WebNavbar />
          {children}
          <WebFooter />
        </div>
      </body>
    </html>
  );
}