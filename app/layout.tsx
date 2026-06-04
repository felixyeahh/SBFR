import type { Metadata } from "next";
import { Inter, Nova_Square } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./tools/userContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const novaSquare = Nova_Square({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nova-square",
});

export const metadata: Metadata = {
  title: "SBFR | Baffu",
  description: "Welcome to ʂ𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯𝕕ˢ",
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
    <html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
