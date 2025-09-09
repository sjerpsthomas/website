import {Header} from "@/components/header/Header";
import {Block} from "@/components/Block";
import {Locale} from "@/api/locale";
import ContentEN from "./content-en.mdx";
import ContentNL from "./content-nl.mdx";

const D = {
  nl: {
  },
  en: {
  }
};


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  // Get dictionary
  const dict = D[locale];

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='home'/>

      {/* Content */}
      <main>
        <div className='flex flex-col items-center'>
          <Block className='w-full md:w-[80%] md:min-w-[30rem]'>
            { locale == 'nl' ? <ContentNL/> : <ContentEN/> }
          </Block>
        </div>
      </main>
    </>
  );
}
