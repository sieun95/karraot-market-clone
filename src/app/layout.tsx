import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/common/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karrot : HOME",
  description: "Karrot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
