import type { Metadata } from "next";
import { Inter, Roboto_Flex } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {twMerge} from "tailwind-merge";
import {SpeedInsights} from "@vercel/speed-insights/next";

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
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <SpeedInsights/>

      <body className={twMerge(font.className, 'px-5 pt-5 pb-20 md:px-20 md:pt-10 md:pb-40')}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}