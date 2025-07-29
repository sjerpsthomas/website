import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";

const D = {
  nl: {
    title: "Ervaring",
    experiences: [
      {
        title: "Voltijd bestuurslid",
        description: "ik was een voltijd bestuurslid enzo",
        skills: [
          "dingen",
          "andere dingen"
        ],
        timespan: "2023-2024",
      },
      {
        title: "Voltijd bestuurslid",
        description: "ik was een voltijd bestuurslid enzo",
        skills: [
          "dingen",
          "andere dingen"
        ],
        timespan: "2023-2024",
      },
    ]
  }
};


export function ExperienceBlock({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D.nl;//[locale];

  return (<>
    <Block className='h-full pr-10'>
      <h1>{dict.title}</h1>

      <section>
        {
          dict.experiences.map((experience, i) =>
            <div key={i} className='mb-5'>
              <h2>
                {experience.title}
                <span className='font-medium text-sm italic'>{' '}({experience.timespan})</span>
              </h2>
              <p className='mb-3'>{experience.description}</p>
              <p className='font-bold'>Skills:</p>
              <ul className='list-disc list-inside'>
                {
                  experience.skills.map((skill, skillIndex) =>
                    <li key={skillIndex}>{skill}</li>
                  )
                }
              </ul>
            </div>
          )
        }
      </section>
    </Block>
  </>);
}