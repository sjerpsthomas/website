'use client'

import {CallbackBlock} from "@/components/Block";
import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from "use-intl";
import {twMerge} from "tailwind-merge";


export function LocaleToggle() {
  // Locale toggle logic
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const toggleLocale = () => {
    const otherLocale = locale == 'nl' ? 'en' : 'nl';
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <CallbackBlock className="bg-gray-700 min-w-[15em] cursor-pointer" onClick={toggleLocale}>
      <p className='text-center'>
        <span className={twMerge(locale == 'nl' && 'font-black underline')}>
          Nederlands
        </span>
        {' / '}
        <span className={twMerge(locale == 'en' && 'font-black underline')}>
          English
        </span>
      </p>
    </CallbackBlock>
  )
}
