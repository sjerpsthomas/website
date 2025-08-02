'use client'

import {Block, CallbackBlock, LinkBlock} from "@/components/Block";
import {twMerge} from "tailwind-merge";
import {Locale} from "@/i18n/routing";
import {useState} from "react";
import _ from "lodash";

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
    subtitle: { nl: "Deze website!", en: "This website!" },
    image: "/thomassjerps_nl.png",
    tags: ["solo", "programming"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Masterscriptie", en: "Master's thesis" },
    subtitle: { nl: "Godot, C#, Python", en: "Godot, C#, Python" },
    image: "/masterscriptie.jpg",
    tags: ["solo", "programming", "uni"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Bartablet", en: "Bar tablet" },
    subtitle: { nl: "", en: "" },
    image: "/bartablet.png",
    tags: ["solo", "programming", "association"],
    description: {
      nl: "TODO",
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
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Videospelletjes!", en: "Video games!" },
    subtitle: { nl: "", en: "" },
    image: "/videospelletjes.png",
    tags: ["solo", "programming", "hobby"],
    description: {
      nl: "TODO",
      en: "TODO"
    },
    links: [],
  },
  {
    title: { nl: "Minor: Topus", en: "Minor: Topus" },
    subtitle: { nl: "", en: "" },
    image: "/minor_topus.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "TODO",
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
      nl: "TODO",
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

  // Define filter state
  const [currentTag, setCurrentTag] = useState<Tag | 'all'>('all');

  return (<>
    <div className='flex flex-col items-center mt-5'>
      {/* Title */}
      <h1>{dict.title}</h1>

      {/* Filters */}
      <Filters locale={locale} currentTag={currentTag} setCurrentTag={setCurrentTag} />

      {/* Items */}
      <Block className='w-full md:w-[50%] md:min-w-[35rem] flex flex-col gap-y-10'>
        <PortfolioItems locale={locale} currentTag={currentTag}/>
      </Block>
    </div>
  </>);
}

function Filters({
  locale, currentTag, setCurrentTag
}: { locale: Locale, currentTag: Tag | 'all', setCurrentTag: (newCurrentTag: Tag | 'all') => void }) {
  const buttonTags: (Tag | 'all')[] = (['all', ...allTags])

  return (
    <div className="flex flex-wrap justify-center">
      {
        buttonTags.map((tag, tagIndex) =>
          <CallbackBlock key={tagIndex}
                         className={twMerge(currentTag != tag ? "bg-black" : "bg-amber-300 text-black", "md:py-3 shadow-lg")}
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
  const items = D[locale].items;

  const filteredItems = currentTag == 'all' ? items : items.filter(it => it.tags.includes(currentTag));

  return filteredItems.map((item, index) => {
    const flip = index % 2 == 0;

    return (
      <section key={item.title} className=''>
        <div className={twMerge('w-[80%] md:w-[60%] print:w-[50%]', flip && 'ml-auto')}>
          <img src={item.image ?? "/foto.png"} alt={undefined}
               className='w-full mb-4 object-cover rounded-xl shadow-heavy'/>

          {/* Title and tags */}
          <div className='flex flex-wrap justify-between items-center'>
            <h2>{item.title}</h2>
            <div className='pl-5 flex flex-wrap gap-x-3 gap-y-1'>
                {item.tags.map((tag, tagIndex) =>
                  <div key={tagIndex} className='bg-[#151515] px-2 py-1 rounded-lg'>{localizedTags[tag][locale]}</div>
                )}
              </div>
            </div>

            <p className='pl-5 italic mb-1'>{item.subtitle}</p>

            <p>{item.description}</p>
          </div>
        </section>
      );
    }
  )
}