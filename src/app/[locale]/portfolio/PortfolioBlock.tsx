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
    subtitle: { nl: "React, TypeScript, Next.js", en: "Website using React, TypeScript, Next.js" },
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
      nl: "Van november 2024 tot juli 2025 heb ik onderzoek verricht voor mijn masterscriptie. " +
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
    subtitle: { nl: "", en: "" },
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
    subtitle: { nl: "GameMaker, Godot, Unity", en: "GameMaker, Godot, Unity" },
    image: "/videospelletjes.png",
    tags: ["solo", "programming", "hobby"],
    description: {
      nl: "Al sinds ik kind ben, ben ik geïnteresseerd in het maken van spelletjes. Ik ben mijn programmeercarrière " +
        "begonnen in GameMaker, en daar heb ik tot m'n 19e veel hobbyprojecten en game jams mee gedaan. " +
        "Later heb ik veel andere frameworks uitgeprobeerd (MonoGame, LWJGL) en ben ik doorgegaan met Godot. " +
        "De screenshot is van 'The Pironaut', hier heb ik een game jam mee gewonnen!",
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
    subtitle: { nl: "", en: "" },
    image: "/minor_nenzo.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Het tweede deel van de minor bestond uit een grotere interactieve installatie, wederom in groepjes van 2. " +
        "De casus: de Koninklijke Bibliotheek in Den Haag wil meer mensen van buiten betrekken. " +
        "De oplossing: 'Nenzo' bestaat uit een oppervlak met kijkgaten, waar een bezoeker nieuwsverhalen kan zien. " +
        "Deze verhalen komen (door middel van een motortje en lus touw) steeds dichter bij de bezoeker.",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Minor: Reflect", en: "Minor: Reflect" },
    subtitle: { nl: "", en: "" },
    image: "/minor_reflect.jpg",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Softwareproject", en: "Software Project" },
    subtitle: { nl: "", en: "" },
    image: "/software_project.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Bachelorscriptie", en: "Bachelor thesis" },
    subtitle: { nl: "", en: "" },
    image: "/bachelor_scriptie.png",
    tags: ["solo", "programming", "uni"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Educool", en: "Educool" },
    subtitle: { nl: "", en: "" },
    image: "/educool.png",
    tags: ["music", "hobby"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Band: Tiewrap", en: "Band: Tiewrap" },
    subtitle: { nl: "", en: "" },
    image: "/tiewrap.jpg",
    tags: ["music", "association"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Band: Once More", en: "Band: Once More" },
    subtitle: { nl: "", en: "" },
    image: "/once_more.jpg",
    tags: ["music", "association"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Invaller/gelegenheids-gigs", en: "Substitute/occasional gigs" },
    subtitle: { nl: "", en: "" },
    image: "/invallen.jpg",
    tags: ["music", "association"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "bit.ly/niksaandehand", en: "bit.ly/niksaandehand" },
    subtitle: { nl: "", en: "" },
    image: "/niksaandehand.png",
    tags: ["team", "hobby"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Fotografie", en: "Photography" },
    subtitle: { nl: "", en: "" },
    image: "/fotografie.png",
    tags: ["solo", "hobby"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Groover Real Book", en: "Groover Real Book" },
    subtitle: { nl: "", en: "" },
    image: "/realbook.png",
    tags: ["solo", "association"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Groover Top 2-Jazzend", en: "Groover Top 2-Jazzend" },
    subtitle: { nl: "", en: "" },
    image: "/top_2_jazzend.png",
    tags: ["solo", "programming", "association"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Jaarboek", en: "Year book" },
    subtitle: { nl: "", en: "" },
    image: "/jaarboek.png",
    tags: ["solo"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "extremec4", en: "extremec4" },
    subtitle: { nl: "", en: "" },
    image: "/extremec4.png",
    tags: ["team", "programming"],
    description: {
      nl: "TODO",
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