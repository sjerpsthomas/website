import {Block, LinkBlock} from "@/components/Block";
import {LocaleToggle} from "@/components/header/LocaleToggle";
import {Locale} from "@/i18n/routing";
import {getDictKeys} from "@/utils/getDictKeys";
import {twMerge} from "tailwind-merge";


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
  // Get dictionary
  const dict = D[locale];

  return (<>
    {/* Top of header */}
    <header className='w-full flex flex-wrap justify-center'>
      {/* Image */}
      <img className="w-[15rem] print:w-[10rem] m-3 rounded-3xl aspect-square" src='/thomas.jpg' alt=''/>

      {/* Title block */}
      <Block className="flex-1">
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
    <nav className='w-full flex flex-wrap justify-center sticky top-0 bg-[#00000088] backdrop-blur-lg print:hidden'>
      {/* Language switcher */}
      <LocaleToggle/>

      {/* Other buttons */}
      <div className="flex flex-wrap justify-center">
        {/* CV */}
        <LinkBlock className="min-w-[10em] shadow-lg" href='/'>
          <p className={twMerge('text-center', currentPage == 'home' && 'font-bold underline')}>Home</p>
        </LinkBlock>

        {/* CV */}
        <LinkBlock className="min-w-[10em] shadow-lg" href='/cv'>
          <p className={twMerge('text-center', currentPage == 'cv' && 'font-bold underline')}>CV</p>
        </LinkBlock>

        {/* Portfolio */}
        <LinkBlock className="min-w-[10em] shadow-lg" href='/portfolio'>
          <p className={twMerge('text-center', currentPage == 'portfolio' && 'font-bold underline')}>Portfolio</p>
        </LinkBlock>
      </div>

    </nav>
  </>)
}
