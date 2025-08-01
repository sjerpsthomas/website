import {Block} from "@/components/Block";
import {Locale} from "use-intl";
import {twMerge} from "tailwind-merge";


const D = {
  nl: {
    title: "Portfolio",
    items: [
      {
        title: "thomassjerps.nl",
        subtitle: "Deze website!",
        image: undefined,
        description: "Ik heb deze website even in elkaar geknald.",
        links: [],
      },
      {
        title: "Masterscriptie",
        subtitle: "Godot, C#, Python",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Bartablet",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "grooverjazz.nl",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Videospelletjes!",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Minor: Topus",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Minor: Nenzo",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Minor: Reflect",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Software Project",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Bachelorscriptie",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Educool",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "HelixxVR",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "bit.ly/niksaandehand",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Fotografie",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Groover Real Book",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Groover Top 2-Jazzend",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },
      {
        title: "Jaarboek",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },

      {
        title: "Connect 4",
        subtitle: "",
        image: undefined,
        description: "",
        links: [],
      },

    ]
  },
  en: {
    items: [

    ]
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

      <Block className='w-full md:w-[60%] md:min-w-[35rem]'>
        {
          dict.items.map((item, index) => {
              const flip = index % 2 == 0;

              return (
                <section key={index} className=''>
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