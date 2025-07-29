import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";
import {getDictKeys} from "@/utils/getDictKeys";


const abilitiesBlock = {
  qualities: [
    "a",
    "b",
    "c",
  ],
  programmingLanguages: [
    "a",
    "b",
    "c",
  ],
  software: [
    "a",
    "b",
    "c",
  ],
  hobbies: [
    "a",
    "b",
    "c",
  ],
}

const D = {
  nl: {
    title: "Vaardigheden",
    headers: {
      qualities: "Kwaliteiten",
      programmingLanguages: "Programmeertalen",
      software: "Software",
      languages: "Talen",
      hobbies: "Hobby's",
    },
    abilities: {
      ...abilitiesBlock,
      languages: [
        "Nederlands",
        "Engels",
      ],
    },
  },
  en: {
    title: "Abilities",
    headers: {
      qualities: "Qualities",
      programmingLanguages: "Programming languages",
      software: "Software",
      languages: "Languages",
      hobbies: "Hobbies",
    },
    abilities: {
      ...abilitiesBlock,
      languages: [
        "Dutch",
        "English",
      ],
    },
  }
};



export function AbilitiesBlock({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <Block className='h-full'>
      <h1>{dict.title}</h1>

      <section>
        {
          getDictKeys(dict.headers).map((header) =>
            <div key={header} className='mb-3'>
              <h2>{dict.headers[header]}</h2>
              {
                dict.abilities[header].map((ability) =>
                  <p key={ability}>{ability}</p>
                )
              }
            </div>
          )
        }
      </section>
    </Block>
  </>);
}