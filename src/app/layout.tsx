import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar/Navbar";
import {Providers} from "./providers";
import {fonts} from "./fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Calendrier | internRFC",
    template: "%s | internRFC",
  },
  description: "interRFC website for intern management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body className={inter.className}>
      <Providers>
        <Navbar/>
       <main>{children}</main> 
       </Providers>
      </body>
      
    </html>
  );
}
