import {Header} from "@/components/header/Header";
import {AbilitiesBlock} from "@/app/[locale]/cv/AbilitiesBlock";
import {ExperienceBlock} from "@/app/[locale]/cv/ExperienceBlock";
import {EducationBlock} from "@/app/[locale]/cv/EducationBlock";
import {Locale} from "@/api/locale";


const D = {
  nl: {
    title: "CV",
    factDigital: "Leuk feitje: als je deze pagina print, krijg je mijn echte CV!",
    factPrint: [
      "Leuk feitje: deze pagina is een afdruk van thomassjerps.nl/cv!",
      "Op deze site kun je ook mijn portfolio vinden, en meer."
    ]
  },
  en: {
    title: "CV",
    factDigital: "Fun fact: if you print this page, you get my actual CV!",
    factPrint: [
      "Fun fact: this page is a print-out of thomassjerps.nl/cv!",
      "On this site, you can also find my portfolio and more."
    ]
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
        <h1 className='text-center mt-5 print:hidden'>{dict.title}</h1>

        <div className='flex flex-wrap justify-stretch items-stretch'>
          {/* Education / Abilities */}
          <div className='flex-1 flex flex-col print:w-[40%]'>
            <EducationBlock locale={locale}/>
            <AbilitiesBlock locale={locale}/>
          </div>

          {/* Abilities */}
          <div className='flex-1/4 print:w-[60%]'>
            <ExperienceBlock locale={locale}/>
          </div>
        </div>

      </main>

      {/* Printout comment */}
      <div className='text-center text-sm mt-6 mb-3 italic'>
        <p className='block print:hidden'>{dict.factDigital}</p>
        <p className='hidden print:block'>{dict.factPrint[0]}<br/>{dict.factPrint[1]}</p>
      </div>
    </>
  );
}