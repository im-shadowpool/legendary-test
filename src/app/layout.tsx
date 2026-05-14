import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import TransitionProvider from "@/providers/TransitionProvider";
import localFont from "next/font/local";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montReal = localFont({
  src: [
    {
      path: "../assets/fonts/Montreal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Montreal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magnet Me",
  description: "Magnet Me",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montReal.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScrollProvider>
          <Header />

          {children}

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
