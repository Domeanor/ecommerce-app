import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import Providers from "@/app/_components/Providers";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopNext",
  description: "A simple e-commerce app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} min-h-full bg-gray-50 antialiased`}>
        <Providers>
          <Header />
          <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
