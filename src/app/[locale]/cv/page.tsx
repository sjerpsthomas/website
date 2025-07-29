import {Header} from "@/components/header/Header";
import {Locale} from "@/i18n/routing";
import {AbilitiesBlock} from "@/app/[locale]/cv/AbilitiesBlock";
import {ExperienceBlock} from "@/app/[locale]/cv/ExperienceBlock";
import {Footer} from "@/components/Footer";


const D = {
  nl: {
    factDigital: "Leuk feitje: als je deze pagina print, krijg je mijn echte CV!",
    factPrint: "Leuk feitje: deze pagina is een afdruk van thomassjerps.nl/cv!"
  },
  en: {
    factDigital: "Fun fact: if you print this page, you get my actual CV!",
    factPrint: "Fun fact: this page is a print-out of thomassjerps.nl/cv!"
  },
}


export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  // Get dictionary
  const dict = D[locale];

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='cv'/>

      {/* Content */}
      <main>
        <div className='flex flex-wrap justify-stretch items-stretch gap-y-5'>
          {/* Abilities */}
          <div className='flex-1 min-w-fit'>
            <AbilitiesBlock locale={locale}/>
          </div>

          {/* Abilities */}
          <div className='flex-1/4 min-w-fit'>
            <ExperienceBlock locale={locale}/>
          </div>
        </div>

      </main>

      {/* Printout comment */}
      <div className='text-center text-sm mt-6 mb-3 italic'>
        <p className='block print:hidden'>{dict.factDigital}</p>
        <p className='hidden print:block'>{dict.factPrint}</p>
      </div>

      {/* Footer */}
      <Footer locale={locale}/>
    </>
  );
}