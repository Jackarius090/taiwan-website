import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taiwan map game",
  description: "Test your Taiwan geography!",
  icons: {
    icon: "/Taiwanese_flag.svg",
  },
};
