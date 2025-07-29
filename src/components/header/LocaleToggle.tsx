'use client'

import {CallbackBlock} from "@/components/Block";
import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from "use-intl";
import classNames from "classnames";


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
    <CallbackBlock className="bg-gray-700 min-w-[10em] cursor-pointer" onClick={toggleLocale}>
      <p className='text-center'>
        Taal:{' '}
        <span className={classNames({'font-black underline': locale == 'nl'})}>
          NL
        </span>
        {' / '}
        <span className={classNames({'font-black underline': locale == 'en'})}>
          EN
        </span>
      </p>
    </CallbackBlock>
  )
}
