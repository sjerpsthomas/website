import {Block, LinkBlock} from "@/components/Block";
import {LocaleToggle} from "@/components/header/LocaleToggle";
import {getDictKeys} from "@/utils/getDictKeys";
import {twMerge} from "tailwind-merge";
import {Locale} from "@/api/locale";


const socials = {
  linkedIn: {
    name: "LinkedIn",
    username: '/in/thomas-sjerps',
    href: "https://www.linkedin.com/in/thomas-sjerps/",
  },
  gitHub: {
    name: "GitHub",
    username: '/sjerpsthomas',
    href: "https://github.com/sjerpsthomas",
  },

  // Phone number and email are handled with environment variables
  telephone: process.env.PHONE === undefined ? undefined : {
    name: "Tel.",
    username: process.env.PHONE,
    href: undefined,
  },
  email: process.env.EMAIL === undefined ? undefined : {
    name: "Email",
    username: process.env.EMAIL,
    href: `mailto:${process.env.EMAIL}`,
  }
}

const D = {
  nl: {
    name: "Thomas Sjerps",
    socials: socials,
    pages: {
      home: "Home",
      cv: "CV",
      portfolio: "Portfolio",
      games: "Spelletjes",
    }
  },
  en: {
    name: "Thomas Sjerps",
    socials: socials,
    pages: {
      home: "Home",
      cv: "CV",
      portfolio: "Portfolio",
      games: "Games",
    }
  },
};

type CurrentPage = 'home' | 'cv' | 'portfolio' | 'games';

export function Header({locale, currentPage}: {locale: Locale, currentPage: CurrentPage}) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    {/* Top of header */}
    <header className='w-full flex flex-col print:flex-row md:flex-row md:flex-wrap md:justify-center'>
      {/* Image */}
      <img className="w-[15rem] print:w-[7rem] m-1 md:m-3 mx-auto rounded-xl md:rounded-3xl aspect-square object-cover" src='/thomas.jpg' alt=''/>

      {/* Title block */}
      <Block className="flex-1">
        {/* Name */}
        <h1 className='text-3xl md:text-6xl print:text-2xl'>{dict.name}</h1>

        {/* Socials */}
        {
          getDictKeys(dict.socials).map(it => {
            if (dict.socials[it] === undefined) return;

            return (<p key={it}>
                {dict.socials[it].name}
                {': '}
                <a href={dict.socials[it].href}>{dict.socials[it].username}</a>
              </p>);
            }
          )
        }

      </Block>
    </header>

    {/* Nav bar */}
    <nav className='w-full z-10 flex flex-wrap justify-center not-md:py-1 sticky top-2 rounded-xl md:rounded-3xl bg-[#00000088] backdrop-blur-lg print:hidden'>
      {/* Language switcher */}
      <LocaleToggle/>

      {/* Other buttons (1/2)*/}
      <div className="flex flex-wrap justify-center">
        {/* Home */}
        <LinkBlock className="w-[5rem] md:w-[8rem] md:py-3 shadow-lg" href='' locale={locale}>
          <p className={twMerge('text-center', currentPage == 'home' && 'font-bold underline')}>{dict.pages.home}</p>
        </LinkBlock>

        {/* CV */}
        <LinkBlock className="w-[5rem] md:w-[8rem] md:py-3 shadow-lg" href='cv' locale={locale}>
          <p className={twMerge('text-center', currentPage == 'cv' && 'font-bold underline')}>{dict.pages.cv}</p>
        </LinkBlock>
      </div>

      {/* Other buttons (2/2)*/}
      <div className="flex flex-wrap justify-center">
        {/* Portfolio */}
        <LinkBlock className="w-[5rem] md:w-[8rem] md:py-3 shadow-lg" href='portfolio' locale={locale}>
          <p className={twMerge('text-center', currentPage == 'portfolio' && 'font-bold underline')}>{dict.pages.portfolio}</p>
        </LinkBlock>

        {/* Games */}
        <LinkBlock className="w-[5rem] md:w-[8rem] md:py-3 shadow-lg" href='games' locale={locale}>
          <p className={twMerge('text-center', currentPage == 'games' && 'font-bold underline')}>{dict.pages.games}</p>
        </LinkBlock>
      </div>

    </nav>
  </>)
}
