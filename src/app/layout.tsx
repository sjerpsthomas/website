import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const font = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website!",
  description: "TODO: verbeteren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        {children}
      </body>
    </html>
  );
}
