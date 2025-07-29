import {Block, LinkBlock} from "@/components/Block";
import {LocaleToggle} from "@/components/header/LocaleToggle";
import {Locale} from "@/i18n/routing";
import {getDictKeys} from "@/utils/getDictKeys";
import classNames from "classnames";


const socials = {
  linkedIn: {
    name: "LinkedIn",
    username: 'thomassjerps ofzo',
    href: "google.com",
  },
  gitHub: {
    name: "GitHub",
    username: 'thomassjerps ofzo',
    href: "https://github.com/gitHub",
  }
}

const D = {
  nl: {
    name: "Thomas Sjerps",
    socials: socials,
  },
  en: {
    name: "Thomas Sjerps",
    socials: socials,
  },
};

type CurrentPage = 'home' | 'cv' | 'portfolio';

export function Header({locale, currentPage}: {locale: Locale, currentPage: CurrentPage}) {
  const dict = D[locale];

  return (<>
    {/* Top of header */}
    <header className='w-full flex flex-wrap justify-center'>
      {/* Image */}
      <img className="w-[15rem] m-3 rounded-3xl aspect-square bg-gray-700" src='/thomas.jpg' alt=''/>

      {/* Title block */}
      <Block className="flex-1 bg-gray-700">
        {/* Name */}
        <h1>{dict.name}</h1>

        {/* Socials */}
        {
          getDictKeys(dict.socials).map(it =>
            <p key={it}>
              {dict.socials[it].name}
              {': '}
              <a href={dict.socials[it].href}>{dict.socials[it].username}</a>
            </p>
          )
        }

      </Block>
    </header>

    {/* Nav bar */}
    <nav className='w-full flex flex-wrap justify-center sticky top-0 print:hidden'>
      {/* Language switcher */}
      <LocaleToggle/>

      {/* Other buttons */}
      <div className="flex flex-wrap justify-center">
        {/* CV */}
        <LinkBlock className="min-w-[10em]" href='/'>
          <p className={classNames('text-center', { 'font-bold underline': currentPage == 'home' })}>Home</p>
        </LinkBlock>

        {/* CV */}
        <LinkBlock className="min-w-[10em]" href='/cv'>
          <p className={classNames('text-center', { 'font-bold underline': currentPage == 'cv' })}>CV</p>
        </LinkBlock>

        {/* Portfolio */}
        <LinkBlock className="min-w-[10em]" href='/portfolio'>
          <p className={classNames('text-center', { 'font-bold underline': currentPage == 'portfolio' })}>Portfolio</p>
        </LinkBlock>
      </div>

    </nav>
  </>)
}
