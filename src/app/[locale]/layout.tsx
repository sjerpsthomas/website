import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "../globals.css";
import {twMerge} from "tailwind-merge";
import {Locale} from "@/api/locale";

const font = Roboto_Flex({
  subsets: ['latin'],
  axes: ['wdth']
})

export const metadata: Metadata = { title: "Thomas Sjerps" };

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Get locale
  const locale = (await params).locale as Locale;

  return (
    <html lang={locale}>
      <body className={twMerge(font.className, 'px-5 pt-5 pb-20 md:px-20 md:pt-10 md:pb-40')}>
        {children}
      </body>
    </html>
  );
}