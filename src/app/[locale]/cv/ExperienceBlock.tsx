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
        description: "Met de commissie (7 pers.) gewerkt aan betere codekwaliteit en documentatie van een " +
          "nét iets te gehaast gelanceerde website.",
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
          "waaronder een BTW-statuswijziging en vernieuwing van het incassosysteem.",
        skills: [
          "Begeleiding van commissies",
          "Communicatie met derde partijen",
          "Financieel overzicht",
        ],
        timespan: "2023-2024, ±50u/week",
      },
      {
        title: "Lid werving-/activiteitencommissie",
        company: "D.S.J.V. Groover, Delft",
        description: "Organiseren van evenementen als secretaris van de wervingscommissie (OWeeCie) en voorzitter " +
          "van de activiteitencommissie (Jassie). " +
          "De OWeeCie verzorgt o.a. een vijfdaags festival in augustus met avondoptredens op een pontonboot. " +
          "De Jassie is o.a. verantwoordelijk voor onze wekelijkse borrel.",
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
          "een groepje van 5 groep 8'ers (het traject is in maart 2020 afgelast vanwege corona). " +
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
    ]
  }
};


export function ExperienceBlock({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D.nl;//[locale];

  return (<>
    <Block className='pr-10'>
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