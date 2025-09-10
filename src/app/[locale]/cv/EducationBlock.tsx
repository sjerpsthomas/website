import {Block} from "@/components/Block";
import {Locale} from "@/api/locale";


const D = {
  nl: {
    title: "Opleidingen",
    educations: [
      {
        title: "VWO",
        location: "Martinuscollege, Grootebroek",
        timespan: "2013-2019",
      },
      {
        title: "BSc Technische Informatica",
        location: "TU Delft",
        timespan: "2019-2022",
      },
      {
        title: "MSc Computer Science",
        location: "TU Delft",
        timespan: "2022-2025",
      },
    ],
  },
  en: {
    title: "Education",
    educations: [
      {
        title: "Pre-university education",
        location: "Martinuscollege, Grootebroek",
        timespan: "2013-2019",
      },
      {
        title: "BSc Computer Science and Engineering",
        location: "Delft University of Technology",
        timespan: "2019-2022",
      },
      {
        title: "MSc Computer Science",
        location: "Delft University of Technology",
        timespan: "2022-2025",
      },
    ],
  },
};


export function EducationBlock({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <Block>
      <h1>{dict.title}</h1>

      <section className='flex flex-col gap-y-3 print:gap-y-1'>
        {
          dict.educations.map((education, i) =>
            <div key={i}>
              <h2>{education.title}</h2>
              <p className='font-medium italic pl-5 mb-1 md:mb-2'>{education.location} ({education.timespan})</p>
            </div>
          )
        }
      </section>
    </Block>
  </>);
}