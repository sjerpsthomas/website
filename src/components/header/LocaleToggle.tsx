'use client'

import {LinkBlock} from "@/components/Block";
import {twMerge} from "tailwind-merge";
import {usePathname} from "next/navigation";
import {determineLocale, Locale} from "@/api/locale";


export function LocaleToggle() {
  // Get pathname and locale
  const pathname = usePathname();
  const locale: Locale = determineLocale(pathname) || 'nl';

  // Get unlocalized path name and other locale
  // (This is absolutely terrible)
  const unlocalizedPathname = pathname.replace(new RegExp(`^/${locale}(/)?`), '');
  const otherLocale = locale == 'nl' ? 'en' : 'nl';

  return (
    <LinkBlock className="bg-gray-700 w-[4.5rem] md:w-[7rem] md:py-3 cursor-pointer shadow-lg" href={unlocalizedPathname} locale={otherLocale}>
      <p className='text-center'>
        <span className={twMerge(locale == 'nl' && 'font-black underline')}>
          NL
        </span>
        {' / '}
        <span className={twMerge(locale == 'en' && 'font-black underline')}>
          EN
        </span>
      </p>
    </LinkBlock>
  )
}
