import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";

const D = {
  nl: {
    title: "Ervaring",
    experiences: [
      {
        title: "Voltijd bestuurslid",
        company: "D.S.J.V. Groover, Delft",
        description: "Voor de Delftse Studenten Jazz Vereniging Groover heb ik een jaar vrijwillig voltijd " +
          "bestuurlijke taken uitgevoerd als commissaris intern, de zogenaamde 'jazzcommissaris', en vice-penningmeester. " +
          "Buiten mijn vaste taken, waaronder verantwoordelijkheid voor het gros van de activiteiten en de muzikale " +
          "identiteit van de vereniging, werkte ik als vice-penningmeester mee aan een grootschalige hervorming van de " +
          "financiele systemen die de vereniging gebruikte (waaronder een wissel van de BTW-status).",
        skills: [
          "...",
        ],
        timespan: "2023-2024",
      },
      {
        title: "Websitecommissielid",
        company: "D.S.J.V. Groover, Delft",
        description: "Beschrijving",
        skills: [
          "...",
        ],
        timespan: "2024-2025",
      },
      {
        title: "Bijlesbegeleider",
        company: "Lyceo, Leiden",
        description: "Beschrijving",
        skills: [
          "...",
        ],
        timespan: "2019-2020",
      },
      {
        title: "Verkoopmedewerker",
        company: "Vomar, Venhuizen",
        description: "Beschrijving",
        skills: [
          "...",
        ],
        timespan: "2017-2021",
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