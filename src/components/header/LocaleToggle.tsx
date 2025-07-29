'use client'

import {CallbackBlock} from "@/components/Block";
import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from "use-intl";
import classNames from "classnames";
import {useTranslations} from "next-intl";


export function LocaleToggle() {
  // Translation function
  const t = useTranslations('Header');

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
        <span className={classNames({'font-black underline': locale == 'nl'})}>
          Nederlands
        </span>
        {' / '}
        <span className={classNames({'font-black underline': locale == 'en'})}>
          English
        </span>
      </p>
    </CallbackBlock>
  )
}
