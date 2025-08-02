'use client'

import {Block, CallbackBlock, LinkBlock} from "@/components/Block";
import {twMerge} from "tailwind-merge";
import {Locale} from "@/i18n/routing";
import {useCallback, useState} from "react";
import _ from "lodash";
import {useSearchParams} from "next/navigation";
import {QueryParamProvider, StringParam, useQueryParam, withDefault} from "use-query-params";
import NextAdapterApp from "next-query-params/app";

const allTags = ["solo", "team", "programming", "uni", "hobby", "association", "music"] as const;
type Tag = (typeof allTags)[number];

type Unlocalized = { nl: string, en: string }

const localizedTags: Record<Tag | 'all', Unlocalized> = {
  solo: { nl: "solo", en: "solo" },
  team: { nl: "in teamverband", en: "in a team" },
  programming: { nl: "programmeren", en: "programming" },
  uni: { nl: "universiteit", en: "university" },
  hobby: { nl: "hobby", en: "hobby" },
  association: { nl: "vereniging", en: "association" },
  music: { nl: "muziek", en: "music" },
  all: { nl: "allemaal", en: "all" },
}

type UnlocalizedItem = {
  title: Unlocalized;
  subtitle: Unlocalized;
  image?: string;
  tags: Tag[];
  description: Unlocalized;
  links: ({ text: Unlocalized, href: string })[];
}

type LocalizedItem = {
  title: string;
  subtitle: string;
  image?: string;
  tags: Tag[];
  description: string;
  links: ({ text: string, href: string })[];
}

function localize(item: UnlocalizedItem, locale: Locale): LocalizedItem {
  return {
    ...item,
    title: item.title[locale],
    subtitle: item.subtitle[locale],
    description: item.description[locale],
    links: item.links.map(link => ({ text: link.text[locale], href: link.href }))
  }
}

const I: UnlocalizedItem[] = [
  {
    title: { nl: "thomassjerps.nl", en: "thomassjerps.nl" },
    subtitle: { nl: "Website in React/TypeScript/Next.js", en: "Website using React/TypeScript/Next.js" },
    image: "/thomassjerps_nl.png",
    tags: ["solo", "programming"],
    description: {
      nl: "In de zomer van 2025 heb ik deze website gemaakt om mijn CV en portfolio in te zetten. Dit is 'm!",
      en: "TODO"
    },
    links: [
      { text: { nl: "Repository", en: "Repository" }, href: "https://www.github.com/sjerpsthomas/website" },
    ],
  },
  {
    title: { nl: "Masterscriptie", en: "Master's thesis" },
    subtitle: { nl: "Onderzoeksproject in Godot/C#, React/TS, Python", en: "Research project using Godot/C#, React/TS, Python" },
    image: "/masterscriptie.jpg",
    tags: ["solo", "programming", "uni"],
    description: {
      nl: "Van november 2024 tot juli 2025 (30 weken) heb ik een zelf-gekozen onderzoek verricht voor mijn masterscriptie. " +
        "Ik heb verschillende algoritmen voor muziekgeneratie ('trading fours') geïmplementeerd en vergeleken " +
        "door middel van een zelf-verzonnen onderzoeksberaming, met zelf-beoordeling, beoordeling door derde partijen " +
        "en poging tot oordeel door middel van statistische technieken.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Bartablet", en: "Bar tablet" },
    subtitle: { nl: "Een app om biertjes mee te bestellen in Kotlin/Jetpack Compose", en: "" },
    image: "/bartablet.png",
    tags: ["solo", "programming", "association"],
    description: {
      nl: "Bij mijn vereniging worden tijdens een borrel biertjes 'geturfd' en achteraf per incasso betaald. " +
        "De vorige turf-app was slecht bruikbaar en on-onderhoudbaar. " +
        "In 2024 heb ik een nieuwe app gemaakt in Jetpack Compose die beter werkt, met zicht op de toekomst en " +
        "integratie met de (door ons gemoderniseerde) ledenadmin-, boekhoud- en incassoworkflow.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "grooverjazz.nl", en: "grooverjazz.nl" },
    subtitle: { nl: "Onderhoud voor website in React/TypeScript/Next.js", en: "" },
    image: "/grooverjazz_nl.png",
    tags: ["team", "programming", "association"],
    description: {
      nl: "In 2024 is een nieuwe website van mijn vereniging gelanceerd. De launch was overhaast gedaan, en dit " +
        "zorgde voor sub-par codekwaliteit en documentatie. In 2024-2025 heb ik veel pagina's beter op een lijn " +
        "geplaatst met het Figma-ontwerp, heb ik de zoekfunctie van een van de pagina's op de schop gegooid en " +
        "integratie met formulieren van de nieuwe ledenadministratie gefaciliteerd.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Videospelletjes!", en: "Video games!" },
    subtitle: { nl: "Game dev in GameMaker, Godot, Unity", en: "GameMaker, Godot, Unity" },
    image: "/videospelletjes.png",
    tags: ["solo", "programming", "hobby"],
    description: {
      nl: "Al sinds ik kind ben, ben ik geïnteresseerd in het maken van spelletjes. Ik ben mijn programmeercarrière " +
        "begonnen in GameMaker, en daar heb ik tot m'n 19e veel hobbyprojecten en game jams mee gedaan. " +
        "Later heb ik veel andere frameworks uitgeprobeerd (MonoGame, LWJGL) en ben ik doorgegaan met Godot. " +
        "De screenshot is van 'The Pironaut', hier heb ik een game jam mee gewonnen! " +
        "Voor een vak van de universiteit heb ik in een groepje een spelletje gemaakt in Unity.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Minor: Topus", en: "Minor: Topus" },
    subtitle: { nl: "Interactief 'dier' in CircuitPython", en: "" },
    image: "/minor_topus.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Voor het eerste project van mijn minor Interactive Environments (bij Industrieel Ontwerpen van de TU) " +
        "moesten we in groepjes van 2 een soort 'dier' maken van buigbaar plastic, en sensoren en motoren in verwerken. " +
        "'Topus' reageert op hoe ver je van 'm af bent door steeds vaker en luider te gillen.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Minor: Nenzo", en: "Minor: Nenzo" },
    subtitle: { nl: "Interactieve kijkgaten", en: "" },
    image: "/minor_nenzo.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Het tweede deel van de minor bestond uit een grotere interactieve installatie, wederom in groepjes van 2. " +
        "De casus: de Koninklijke Bibliotheek in Den Haag wil meer mensen van buiten betrekken. " +
        "De oplossing: 'Nenzo' bestaat uit een oppervlak met kijkgaten, waar een bezoeker nieuwsverhalen kan zien. " +
        "Deze verhalen komen (door middel van een motortje en lus touw, en luider-wordende 'ambient' muziek) " +
        "steeds dichter bij de bezoeker. Ik was onder andere verantwoordelijk voor de motor-beweging en audio.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Minor: Reflect", en: "Minor: Reflect" },
    subtitle: { nl: "Videowand met Kinect in Godot/C#", en: "" },
    image: "/minor_reflect.jpg",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Het laatste en grootste deel van mijn minor (10 weken) was met dezelfde briefing van de Koninklijke Bibliotheek. " +
        "In een groepje van 6 hebben we een videomuur gemaakt die informatie over collecties van de bibliotheek toont " +
        "in de silhouetten van voorbijgangers (gerealiseerd met een Kinect). Ik heb voor dit project alle software gemaakt. " +
        "Het project heeft in 2024 een doorstart-budget gekregen, hoewel er intussen weinig is gebeurd. " +
        "De muur heeft nog wel een tijdje in het gebouw van de KB gestaan.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Softwareproject", en: "Software Project" },
    subtitle: { nl: "IPC voor bedrijfssimulaties", en: "" },
    image: "/software_project.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Aan het einde van mijn tweede jaar van mijn bachelor heb ik in een groepje van 5 een softwareproject (10 weken) " +
        "gedaan bij TEEC2, een bedrijf dat specialiseert in optimalisatie van bedrijfsprocessen door middel van modellen. " +
        "Op basis van zo'n model hebben we een applicatie gemaakt die een persoon binnen een bedrijf simuleert. " +
        "Meerdere samenwerkende applicaties vormen een bedrijf, wat theoretische stress-testing mogelijk maakt. " +
        "Ik was verantwoordelijk voor de peer-to-peer communicatie via Nakama.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Bachelorscriptie", en: "Bachelor thesis" },
    subtitle: { nl: "Optimale 3D-diepteplaatjes", en: "" },
    image: "/bachelor_scriptie.png",
    tags: ["solo", "programming", "uni"],
    description: {
      nl: "Mijn bachelorscriptie duurde 10 weken, en bestond uit het testen van 'chromostereoscopie'-brillen. " +
        "Dit zijn geen 'normale' 3D-brillen: deze brillen buigen blauw licht naar je neus toe, en rood licht de andere kant op," +
        "waardoor de illusie van diepte ontstaat. " +
        "Mijn taak was om plaatjes statistisch te optimaliseren voor zowel 'dieptecontrast' als natuurgetrouwe kleuren.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Educool", en: "Educool" },
    subtitle: { nl: "Muziekproductie", en: "" },
    image: "/educool.png",
    tags: ["music", "hobby"],
    description: {
      nl: "Bij de middelbare school heb je soms opdrachten die je creatief 'naar eigen vorm' kunt invullen. " +
        "Met die insteek is rap-duo Educool begonnen, waarin ik verantwoordelijk ben voor opname en muziekproductie. " +
        "We bestaan al 10 jaar en hebben 4 albums die op alle streamingdiensten staan, " +
        "maar ik zou er niet naar luisteren als ik jou was.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Band: Tiewrap", en: "Band: Tiewrap" },
    subtitle: { nl: "Jazzduo", en: "" },
    image: "/tiewrap.jpg",
    tags: ["music", "association"],
    description: {
      nl: "Samen met mijn oud-bestuursgenoot Yiska zit ik in jazzduo Tiewrap. Zij zingt, ik speel piano. " +
        "We spelen vooral jazzstandards, en we zijn voor iedere gelegenheid te boeken!",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Band: Once More", en: "Band: Once More" },
    subtitle: { nl: "Jazz-combo", en: "" },
    image: "/once_more.jpg",
    tags: ["music", "association"],
    description: {
      nl: "Ik speel keys in de vijfkoppige band Once More, ooit beschreven als een 'warme deken': " +
        "buiten traditionele jazz spelen we ook oude Disney-liedjes en wat meer funky dingen. " +
        "Op de foto hebben we net de Popdelft's Got You Covered-prijs in ontvangst mogen nemen voor het " +
        "beste arrangement van Umbrella van Rihanna (we hadden er bossa nova van gemaakt)!",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Invaller/gelegenheids-gigs", en: "Substitute/occasional gigs" },
    subtitle: { nl: "Muziek maken voor enkel optreden", en: "" },
    image: "/invallen.jpg",
    tags: ["music", "association"],
    description: {
      nl: "Als er bij een activiteit/betaalde gig-aanvraag geen band in z'n geheel beschikbaar is, worden leden van " +
        "mijn vereniging soms individueel gevraagd of ze een 'gelegenheids-gig' kunnen spelen. " +
        "Dat is vaak super gezellig, dus heb ik dat ook een aantal keer gedaan. " +
        "Op de foto is het ons Ledenweekend, is het al 2 uur 's nachts, en bereid ik me voor op " +
        "een cantus waar men luidkeels Stevie Wonder mee gaat zingen. Ik heb amper kunnen repeteren. Ging prima.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "bit.ly/niksaandehand", en: "bit.ly/niksaandehand" },
    subtitle: { nl: "Serie korte films", en: "" },
    image: "/niksaandehand.png",
    tags: ["team", "hobby"],
    description: {
      nl: "Voor onze examenstunt in de zesde klas hebben we een reeks short films gemaakt, die door de dag heen verschenen. " +
        "Ik was verantwoordelijk voor filmen en montage, en de video's staan nog online!",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Fotografie", en: "Photography" },
    subtitle: { nl: "Portret, omgeving en optredens", en: "" },
    image: "/fotografie.png",
    tags: ["solo", "hobby"],
    description: {
      nl: "De afgelopen paar jaar ben ik steeds meer geïnteresseerd geraakt in fotografie, sinds ik de camera van m'n " +
        "vader kon lenen om foto's te maken voor mijn vereniging. De camera is een Nikon, en de nabewerking doe ik in Lightroom.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Groover Real Book", en: "Groover Real Book" },
    subtitle: { nl: "Volledig herzien repertoireboek in MuseScore", en: "" },
    image: "/realbook.png",
    tags: ["solo", "association"],
    description: {
      nl: "Als je samen jazz speelt, doe je dat vaak met 'standards': liedjes die iedereen kent. 'Real books' zijn " +
        "repertoireboekjes met populaire standards. Bij mijn vereniging hadden we er zelf 2 gemaakt. " +
        "Van die boekjes waren echter de oorspronkelijke bronnen verloren, waardoor correctie en aanpassing onmogelijk was. " +
        "Na veel MusicXML importeren, handmatig overtikken en formatting gelijktrekken, heb ik er één mooi boekje van gemaakt.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Groover Top 2-Jazzend", en: "Groover Top 2-Jazzend" },
    subtitle: { nl: "Stemmen op De Lijst Der Lijsten met Python", en: "" },
    image: "/top_2_jazzend.png",
    tags: ["solo", "programming", "association"],
    description: {
      nl: "Een leuk kerstproject tijdens mijn bestuursjaar! Leden mochten stemmen door een (Spotify Wrapped) " +
        "playlist in te leveren, en een door mij geschreven Python-script kon ze met behulp van de Spotify-API " +
        "samenvoegen tot één lijst: de Top 2-Jazzend!",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Jaarboek", en: "Year book" },
    subtitle: { nl: "Layout en design jaarboek", en: "" },
    image: "/jaarboek.png",
    tags: ["solo"],
    description: {
      nl: "In de zesde klas is er door mijn middelbare school een commissie opgesteld om het jaarboek te maken. " +
        "Omdat de commissie dat zelf niet kon, ben ik gevraagd om de layout en design van het jaarboek te maken. " +
        "Dat heb ik gedaan in Illustrator en InDesign. Voor de grap heb ik de kaft fel blauw gemaakt.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "extremec4", en: "extremec4" },
    subtitle: { nl: "Vier op een Rij met HTML5/CSS/JS", en: "" },
    image: "/extremec4.png",
    tags: ["team", "programming"],
    description: {
      nl: "Voor het vak 'Web and Database Management' in het eerste jaar van m'n studie heb ik in een groepje van " +
        "2 een clone van Vier op een Rij gemaakt met simpele web-technologieën. Ik was verantwoordelijk voor de " +
        "management van interne staat en communicatie tussen browservensters met WebSockets. En het logo.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Stagemanager", en: "Stagemanager" },
    subtitle: { nl: "", en: "" },
    image: undefined,
    tags: ["team", "hobby"],
    description: {
      nl: "Ik ben in 2023 en 2024 stagemanager geweest voor het jaarlijkse festival van onze vereniging: 'Just Jazz'. " +
        "Als stagemanager was ik verantwoordelijk voor het draaiboek van mijn podium, communicatie met de bands " +
        "en het welzijn van het licht- en geluidpersoneel tijdens en na het ombouwen. " +
        "In 2023 waren er 1000 bezoekers en was ik verantwoordelijk voor het tweede podium; in 2024 waren er 600 " +
        "bezoekers en was ik verantwoordelijk voor de 'main stage'.",
      en: "TODO"
    },
    links: [],
  },
]

const D = {
  nl: {
    title: "Portfolio",
    items: I.map(item => localize(item, "nl")),
  },
  en: {
    title: "Portfolio",
    items: I.map(item => localize(item, "en")),
  },
}


export function PortfolioBlock({
  locale,
}: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <div className='flex flex-col items-center mt-5'>
      {/* Title */}
      <h1>{dict.title}</h1>

      {/* Filter and items */}
      <QueryParamProvider adapter={NextAdapterApp}>
        <FilterAndItems locale={locale}/>
      </QueryParamProvider>
    </div>
  </>);
}

function FilterAndItems({locale} : {locale: Locale}) {
  // Define filter state
  const [currentTag, setCurrentTag] = useQueryParam('tag', withDefault(StringParam, 'all'));

  return (<>
    <div className='flex flex-col items-center'>
      {/* Filter */}
      <Filter locale={locale} currentTag={currentTag as (Tag | 'all')} setCurrentTag={setCurrentTag} />

      {/* Items */}
      <Block className='w-full md:w-[60%] md:min-w-[35rem] flex flex-col gap-y-10'>
        <PortfolioItems locale={locale} currentTag={currentTag as (Tag | 'all')}/>
      </Block>
    </div>
  </>);
}

function Filter({
  locale, currentTag, setCurrentTag
}: { locale: Locale, currentTag: Tag | 'all', setCurrentTag: (newCurrentTag: Tag | 'all') => void }) {
  const buttonTags: (Tag | 'all')[] = (['all', ...allTags])

  return (
    <div className="flex flex-wrap justify-center print:hidden">
      {
        buttonTags.map((tag, tagIndex) =>
          <CallbackBlock key={tagIndex}
                         className={twMerge(currentTag == tag ? "bg-amber-300 text-black" : "bg-black", "md:py-3 shadow-lg")}
                         onClick={() => {
                           setCurrentTag(currentTag == tag ? 'all' : tag);
                         }}>
            <p className='text-center'>{_.capitalize(localizedTags[tag][locale])}</p>
          </CallbackBlock>
        )
      }
    </div>
  );
}

function PortfolioItems({
  locale, currentTag
}: { locale: Locale, currentTag: Tag | 'all' }) {
  // Get dictionary
  const dict = D[locale];

  // Get items, filter
  const items = dict.items;
  const filteredItems = currentTag == 'all' ? items : items.filter(it => it.tags.includes(currentTag));

  return filteredItems.map((item, index) => {
    const flip = index % 2 == 0;

    return (
      <section key={item.title} className=''>
        <div className={twMerge('w-[80%] md:w-[60%] print:w-[50%]', flip && 'ml-auto')}>
          <img src={item.image ?? "/foto.png"} alt=""
               className='w-full mb-4 object-cover rounded-xl shadow-heavy'/>

          {/* Title and tags */}
          <div className='flex flex-col print:flex-row print:flex-wrap justify-between gap-y-1 mb-2'>
            <h2>{item.title}</h2>
            <div className='pl-5 flex flex-wrap gap-x-3 gap-y-1'>
              {item.tags.map((tag, tagIndex) =>
                <div key={tagIndex} className='bg-[#151515] px-2 py-1 rounded-lg shadow-md'>{localizedTags[tag][locale]}</div>
              )}
            </div>
          </div>

          <p className='pl-5 italic mb-1'>{item.subtitle}</p>

          <p>{item.description}</p>

          {
            item.links.length > 0 && <div className='mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 print:hidden'>
              <p>Links:</p>
              {item.links.map((link, tagIndex) =>
                <a key={tagIndex} href={link.href}
                   className='bg-blue-900 px-2 py-1 rounded-lg shadow-md hover:scale-105 transition-transform'>{link.text}</a>
              )}
            </div>
          }
        </div>
      </section>
    );
  });
}