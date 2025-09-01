const locales = ['nl', 'en'] as const;
export type Locale = typeof locales[number];

export function determineLocale(pathname: string): Locale | undefined {
  return locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
}