import {defineRouting} from 'next-intl/routing';

const locales = ['nl', 'en'] as const;
export type Locale = typeof locales[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en'
});
