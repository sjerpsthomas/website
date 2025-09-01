import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";
import {BulletPointList} from "@/components/BulletPointList";

const D = {
  nl: {
    title: "Ervaring",
    experiences: [
      {
        title: "Voorzitter websitecommissie (WebCie)",
        company: "D.S.J.V. Groover, Delft",
        description: "Met de commissie (7 pers.) gewerkt aan betere codekwaliteit, documentatie, en verbeterd design " +
          "voor een nét iets te gehaast gelanceerde website.",
        skills: [
          "Software development in praktisch teamverband",
          "Opstellen en verdelen van development- en designtaken",
          "Werken in TypeScript/React/Next.js, met GitHub (issues, PRs)",
        ],
        timespan: "2024-2025, ±5h/week",
      },
      {
        title: "Voltijd bestuurslid",
        company: "D.S.J.V. Groover, Delft",
        description: "Voltijdsfunctie als commissaris intern (‘jazzcommissaris’) en vice-penningmeester. " +
          "Naast verantwoordelijkheid voor de meeste activiteiten en de muzikale identiteit van de vereniging, " +
          "droeg ik als vice-penningmeester bij aan een grootschalige hervorming van de financiële systemen, " +
          "waaronder een BTW-statuswijziging en vernieuwing van het (SEPA) incassosysteem.",
        skills: [
          "Begeleiding van commissies",
          "Communicatie met derde partijen",
          "Financieel overzicht",
        ],
        timespan: "2023-2024, ±50u/week",
      },
      {
        title: "Lid werving- en activiteitencommissie",
        company: "D.S.J.V. Groover, Delft",
        description: "Organiseren van evenementen als secretaris van de wervingscommissie (OWeeCie) en voorzitter " +
          "van de activiteitencommissie (Jassie). " +
          "De OWeeCie verzorgt o.a. een vijfdaags festival in augustus met avondoptredens op een pontonboot. " +
          "De Jassie is o.a. verantwoordelijk voor de wekelijkse borrel (met muziekopstelling!).",
        skills: [
          "Gestructureerd vergaderen",
          "Prioriteiten stellen en delegeren",
          "Evenementen organiseren",
        ],
        timespan: "2021-2023, 10-20u/week",
      },
      {
        title: "Bijlesbegeleider",
        company: "Lyceo, Leiden / Privé, West-Friesland",
        description: "Bijles geven met voorgeschreven oefeningen en uitleg op maatwerk, zowel individueel als in groepsverband. " +
          "Voor bijlesbedrijf Lyceo heb ik een traject uitgevoerd ('Lyceo Opstap') voor CITO-training voor " +
          "een groepje van 5 groep 8'ers; het traject is in maart 2020 vroegtijdig stopgezet vanwege COVID. " +
          "Tijdens de coronaperiode heb ik via privécontacten examentraining gegeven aan middelbare scholieren.",
        skills: [
          "Zorgvuldig begeleiden van leerlingen",
          "Lesmateriaal voorbereiden",
          "Als een echte leraar een kop koffie vasthouden tijdens buitenspeel-tijd"
        ],
        timespan: "2019-2020, ±3u/week",
      },
      {
        title: "Verkoopmedewerker",
        company: "Vomar, Venhuizen",
        description: "Uitvoeren van standaard supermarktwerkzaamheden (vakkenvullen, kassa, etc.), " +
          "met klantvriendelijke service en verantwoordelijkheid voor mijn afdeling op drukke dagen.",
        skills: [
          "Hard werken",
          "Communicatie met klanten",
          "Toezien dat taken op tijd af zijn",
        ],
        timespan: "2017-2021, ±18u/week",
      },
    ],
  },
  en: {
    title: "Experience",
    experiences: [
      {
        title: "Chair of Website Committee (WebCie)",
        company: "D.S.J.V. Groover, Delft",
        description: "Worked with the committee (7 people) on improving code quality, documentation, and design " +
          "for a website that had been launched a little too hastily.",
        skills: [
          "Software development in a practical team setting",
          "Planning and delegating development and design tasks",
          "Working with TypeScript/React/Next.js, using GitHub (issues, PRs)",
        ],
        timespan: "2024–2025, ~5h/week",
      },
      {
        title: "Full-time Board Member",
        company: "D.S.J.V. Groover, Delft",
        description: "Full-time position as Internal Affairs Commissioner (‘Jazz Commissioner’) and Vice Treasurer. " +
          "In addition to being responsible for most activities and the association’s musical identity, " +
          "I contributed as Vice Treasurer to a large-scale reform of the financial systems, " +
          "including a change in VAT status and an overhaul of the direct debit (SEPA) money collection system.",
        skills: [
          "Supervising committees",
          "Communicating with third parties",
          "Financial oversight",
        ],
        timespan: "2023–2024, ~50h/week",
      },
      {
        title: "Member of Recruitment/Activities Committees",
        company: "D.S.J.V. Groover, Delft",
        description: "Organized events as secretary of the recruitment committee (OWeeCie) and chair " +
          "of the activities committee (Jassie). " +
          "The OWeeCie organizes, among other things, a five-day festival in August with evening performances on a pontoon boat. " +
          "The Jassie is responsible for the weekly social event (with music setup!).",
        skills: [
          "Structured meetings",
          "Setting priorities and delegating",
          "Event organization",
        ],
        timespan: "2021–2023, 10–20h/week",
      },
      {
        title: "Tutor",
        company: "Lyceo, Leiden / Private, West-Friesland",
        description: "Tutoring using prescribed exercises and personalized explanations, both individually and in groups. " +
          "For tutoring company Lyceo, I led a program ('Lyceo Opstap') for CITO exam prep for " +
          "a group of five 8th graders (12-year-olds); the program was prematurely terminated in March 2020 due to COVID. " +
          "During the pandemic, I gave private exam prep sessions to high school students.",
        skills: [
          "Carefully guiding students",
          "Preparing lesson materials",
          "Holding a cup of coffee like a real teacher during recess",
        ],
        timespan: "2019–2020, ~3h/week",
      },
      {
        title: "Sales Assistant",
        company: "Vomar, Venhuizen",
        description: "Performed standard supermarket tasks (restocking shelves, cashier, etc.), " +
          "with friendly customer service and responsibility for my department on busy days.",
        skills: [
          "Working hard",
          "Customer communication",
          "Ensuring tasks are completed on time",
        ],
        timespan: "2017–2021, ~18h/week",
      },
    ],
  },
};


export function ExperienceBlock({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <Block>
      <h1>{dict.title}</h1>

      <section>
        {
          dict.experiences.map((experience, i) =>
            <div key={i} className='mb-3 md:mb-5'>
              <h2>{experience.title}</h2>
              <p className='font-medium italic pl-5 mb-1 md:mb-2'>{experience.company} ({experience.timespan})</p>

              <p className='mb-2 md:mb-3'>{experience.description}</p>
              <p className='font-bold'>Skills:</p>
              <BulletPointList content={experience.skills}/>
            </div>
          )
        }
      </section>
    </Block>
  </>);
}