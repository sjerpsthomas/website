import {Block} from "@/components/Block";
import {twMerge} from "tailwind-merge";
import {Locale} from "@/i18n/routing";


type Tag = "solo" | "team" | "business" | "funny" | "uni" | "hobby"

function getItems(locale: Locale) {
  const I = [
    {
      title: { nl: "thomassjerps.nl", en: "thomassjerps.nl" },
      subtitle: "Deze website!",
      image: "/thomassjerps_nl.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Masterscriptie", en: "Master's thesis" },
      subtitle: "Godot, C#, Python",
      image: "/masterscriptie.jpg",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Bartablet", en: "Bar tablet" },
      subtitle: "",
      image: "/bartablet.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "grooverjazz.nl", en: "grooverjazz.nl" },
      subtitle: "",
      image: "/grooverjazz_nl.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Videospelletjes!", en: "Video games!" },
      subtitle: "",
      image: "/videospelletjes.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Minor: Topus", en: "Minor: Topus" },
      subtitle: "",
      image: "/minor_topus.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Minor: Nenzo", en: "Minor: Nenzo" },
      subtitle: "",
      image: "/minor_nenzo.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Minor: Reflect", en: "Minor: Reflect" },
      subtitle: "",
      image: "/minor_reflect.jpg",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Softwareproject", en: "Software Project" },
      subtitle: "",
      image: "/software_project.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Bachelorscriptie", en: "Bachelor thesis" },
      subtitle: "",
      image: "/bachelor_scriptie.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Educool", en: "Educool" },
      subtitle: "",
      image: "/educool.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Band: Tiewrap", en: "Band: Tiewrap" },
      subtitle: "",
      image: "/tiewrap.jpg",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Band: Once More", en: "Band: Once More" },
      subtitle: "",
      image: "/once_more.jpg",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Invaller/gelegenheids-gigs", en: "Substitute/occasional gigs" },
      subtitle: "",
      image: "/invallen.jpg",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "bit.ly/niksaandehand", en: "bit.ly/niksaandehand" },
      subtitle: "",
      image: "/niksaandehand.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Fotografie", en: "Photography" },
      subtitle: "",
      image: "/fotografie.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Groover Real Book", en: "Groover Real Book" },
      subtitle: "",
      image: "/realbook.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Groover Top 2-Jazzend", en: "Groover Top 2-Jazzend" },
      subtitle: "",
      image: "/top_2_jazzend.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "Jaarboek", en: "Year book" },
      subtitle: "",
      image: "/jaarboek.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },
    {
      title: { nl: "extremec4", en: "extremec4" },
      subtitle: "",
      image: "/extremec4.png",
      tags: [] as Tag[],
      description: "TODO: beschrijving",
      links: [],
    },

  ]

  return I.map(item => ({
    ...item,
    title: item.title[locale],
  }))
}

const D = {
  nl: {
    title: "Portfolio",
    items: getItems("nl"),
  },
  en: {
    title: "Portfolio",
    items: getItems("en"),
  },
}


export function PortfolioBlock({
  locale,
}: { locale: Locale }) {
  // Get dictionary
  const dict = D.nl;//[locale];

  return (<>
    <div className='flex flex-col items-center mt-5'>
      <h1>{dict.title}</h1>

      <Block className='w-full md:w-[50%] md:min-w-[35rem]'>
        {
          dict.items.map((item, index) => {
              const flip = index % 2 == 0;

              return (
                <section key={item.title} className=''>
                  <div className={twMerge('w-[90%] md:w-[60%] p-5', flip && 'ml-auto')}>
                    <img src={item.image ?? "/foto.png"} alt={undefined} className='w-full mb-4 object-cover rounded-xl shadow-heavy'/>
                    <h2>{item.title}</h2>
                    <p className='px-5 italic mb-1'>{item.subtitle}</p>

                    <p>{item.description}</p>
                  </div>
                </section>
              );
            }
          )
        }
      </Block>
    </div>
  </>);
}