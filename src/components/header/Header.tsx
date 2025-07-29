import {Block, LinkBlock} from "@/components/Block";
import {LocaleToggle} from "@/components/header/LocaleToggle";
import {useMessages, useTranslations} from "next-intl";
import {useTranslationsObject} from "@/i18n/useTranslationsObject";

function Socials() {
  const [linkKeys, links] = useTranslationsObject<string>('header.socials', 'link');

  return (
    <>
      {linkKeys.map(it => (
        <div key={it}>{links[it]}</div>
      ))}
    </>
  );
}

export function Header() {
  const t = useTranslations('header');

  return (<>
    {/* Top of header */}
    <header className='w-full flex flex-wrap justify-center'>
      {/* Image */}
      <img className="w-[15rem] m-3 rounded-3xl aspect-square bg-gray-700" src='/thomas.jpg' alt=''/>

      {/* Socials */}
      <Block className="flex-1 bg-gray-700">
        <h1>{t('title')}</h1>
        <Socials/>
      </Block>
    </header>

    {/* Nav bar */}
    <nav className='w-full flex flex-wrap justify-center sticky top-0'>
      {/* Language switcher */}
      <LocaleToggle/>

      {/* Other buttons */}
      <div className="flex flex-wrap justify-center">
        {/* CV */}
        <LinkBlock className="min-w-[10em]" href='/'>
          <p className='text-center'>Home</p>
        </LinkBlock>

        {/* CV */}
        <LinkBlock className="min-w-[10em]" href='/cv'>
          <p className='text-center'>CV</p>
        </LinkBlock>

        {/* Portfolio */}
        <LinkBlock className="min-w-[10em]" href='/portfolio'>
          <p className='text-center'>Portfolio</p>
        </LinkBlock>
      </div>

    </nav>
  </>)
}
