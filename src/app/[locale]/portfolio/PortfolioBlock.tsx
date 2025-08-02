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
        image: "/thomassjerps_nl.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Masterscriptie",
        subtitle: "Godot, C#, Python",
        image: "/masterscriptie.jpg",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Bartablet",
        subtitle: "",
        image: "/bartablet.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "grooverjazz.nl",
        subtitle: "",
        image: "/grooverjazz_nl.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Videospelletjes!",
        subtitle: "",
        image: "/videospelletjes.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Minor: Topus",
        subtitle: "",
        image: "/minor_topus.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Minor: Nenzo",
        subtitle: "",
        image: "/minor_nenzo.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Minor: Reflect",
        subtitle: "",
        image: "/minor_reflect.jpg",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Software Project",
        subtitle: "",
        image: "/software_project.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Bachelorscriptie",
        subtitle: "",
        image: "/bachelor_scriptie.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Educool",
        subtitle: "",
        image: "/educool.png",
        description: "TODO: beschrijving",
        links: [],
      },
      // {
      //   title: "HelixxVR",
      //   subtitle: "",
      //   image: undefined,
      //   description: "",
      //   links: [],
      // },
      {
        title: "Tiewrap",
        subtitle: "",
        image: "/tiewrap.jpg",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Once More",
        subtitle: "",
        image: "/once_more.jpg",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Invaller/gelegenheids-gigs",
        subtitle: "",
        image: "/invallen.jpg",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "bit.ly/niksaandehand",
        subtitle: "",
        image: "/niksaandehand.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Fotografie",
        subtitle: "",
        image: undefined,
        description: "Ironisch dat ik hier nog geen foto bij heb, hè?",
        links: [],
      },
      {
        title: "Groover Real Book",
        subtitle: "",
        image: "/realbook.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Groover Top 2-Jazzend",
        subtitle: "",
        image: "/top_2_jazzend.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "Jaarboek",
        subtitle: "",
        image: "/jaarboek.png",
        description: "TODO: beschrijving",
        links: [],
      },
      {
        title: "extremec4",
        subtitle: "",
        image: "/extremec4.png",
        description: "TODO: beschrijving",
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