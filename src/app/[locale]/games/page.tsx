import {Header} from "@/components/header/Header";
import {Block} from "@/components/Block";
import {Locale} from "@/api/locale";
import ContentNL from "../../../../content/games/content-nl.mdx"
import ContentEN from "../../../../content/games/content-en.mdx"


const D = {
  nl: {
    title: "Spelletjes",
  },
  en: {
    title: "Games",
  },
}


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  // Get dictionary
  const dict = D[locale];

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='games'/>

      {/* Content */}
      <main>
        <div className='flex flex-col items-center'>
          {/* Title */}
          <h1 className='my-5'>{dict.title}</h1>

          <Block className='w-full md:w-[80%] md:min-w-[30rem]'>
            { locale == 'nl' ? <ContentNL/> : <ContentEN/> }
          </Block>
        </div>
      </main>
    </>
  );
}
