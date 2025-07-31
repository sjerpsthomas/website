import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";
import {BulletPointList} from "@/components/BulletPointList";

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
          "financiele systemen die de vereniging gebruikte (waaronder een wissel van de BTW-status, en een hernieuwde " +
          "'turftablet' voor gebruik achter de bar).",
        skills: [
          "...",
        ],
        timespan: "2023-2024",
      },
      {
        title: "Websitecommissielid",
        company: "D.S.J.V. Groover, Delft",
        description: "Op 20 maart 2024 (toen ik nog bestuurslid was), werd een hernieuwde website van de vereniging gelanceerd. " +
          "Hoewel deze site zeker een verbetering was, was er vrijwel meteen een hoog niveau aan technical debt en " +
          "functionaliteit die niet geheel zoals gewenst werkte. " +
          "Vrijwel meteen na mijn decharge ben ik in de websitecommissie gegaan om deze dingen op te lossen. " +
          "Als voorzitter heb ik de commissie aangestuurd om code-kwaliteit en -hergebruik te verbeteren, " +
          "en op eigen initiatief heb ik veel elementen en pagina's herzien en opgeknapt.",
        skills: [
          "...",
        ],
        timespan: "2024-2025",
      },
      {
        title: "Bijlesbegeleider",
        company: "Lyceo, Leiden",
        description: "Voor bijlesbedrijf Lyceo heb ik een traject uitgevoerd ('Lyceo Opstap') voor CITO-training voor " +
          "een groepje van 5 groep 8'ers. De lessen bestonden uit voorgeschreven (groeps- en individuele) oefeningen, " +
          "evenals uitleg in groepsverband.",
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