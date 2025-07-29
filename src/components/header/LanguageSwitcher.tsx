'use client'

import {CallbackBlock} from "@/components/Block";


export function LanguageSwitcher() {
  return (
    <CallbackBlock className="bg-gray-700 min-w-[10em] cursor-pointer" onClick={console.log}>
      <p className='text-center'>
        Taal:{' '}
        {/* TODO: make used langugage bold */}
        NL
        {' / '}
        EN
      </p>
    </CallbackBlock>
  )
}
