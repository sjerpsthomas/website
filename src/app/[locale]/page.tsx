import {Header} from "@/components/header/Header";
import {BulletPointList} from "@/components/BulletPointList";
import {Block} from "@/components/Block";
import {Locale} from "@/api/locale";


const D = {
  nl: {
    texts: [
      "Hoi!",
      "Welkom bij mijn website. Hier kan je m'n CV en portfolio vinden.",
      "Ik heb nog een paar plannen voor de site:",
    ],
    todo: [
      "Spelletjespagina",
      "De Next router fixen (hij doet raar bij het wisselen van taal)",
      "Turbopack fixen (local hot reload werkt niet meer)",
      "Fotopagina?",
    ]
  },
  en: {
    texts: [
      "Hi!",
      "Welcome to my website. Here you can find my CV and portfolio.",
      "I have a few more plans for the site:",
    ],
    todo: [
      "Games page",
      "Fix the Next router (it's acting strangely when switching languages)",
      "Fix Turbopack (local hot reload isn't working anymore)",
      "Photo page?",
    ]
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
      <Header locale={locale} currentPage='home'/>

      {/* Content */}
      <main>
        <Block>
          <h1>{dict.texts[0]}</h1>

          <p>{dict.texts[1]}</p>
          <p>{dict.texts[2]}</p>
          <BulletPointList content={dict.todo}/>
        </Block>
      </main>
    </>
  );
}
