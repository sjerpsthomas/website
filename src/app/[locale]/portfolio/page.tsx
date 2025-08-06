import {Header} from "@/components/header/Header";
import {PortfolioBlock} from "@/app/[locale]/portfolio/PortfolioBlock";
import {getPortfolioItems, getPortfolioTags} from "@/api/strapi";
import {Locale} from "@/api/locale";


const D = {
  nl: {
    factPrint: "Leuk feitje: deze pagina is een afdruk van thomassjerps.nl/portfolio!"
  },
  en: {
    factPrint: "Fun fact: this page is a print-out of thomassjerps.nl/portfolio!"
  },
}


export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  const items = await getPortfolioItems(locale);
  const tags = await getPortfolioTags(locale);

  // Get dictionary
  const dict = D[locale];

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='portfolio' />

      {/* Content */}
      <main>
        <PortfolioBlock locale={locale} items={items} tags={tags}/>
      </main>

      {/* Printout comment */}
      <div className='text-center text-sm mt-6 mb-3 italic'>
        <p className='hidden print:block'>{dict.factPrint}</p>
      </div>
    </>
  );
}