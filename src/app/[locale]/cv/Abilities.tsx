import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";
import {getDictKeys} from "@/utils/getDictKeys";


const abilities = {
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
    headers: {
      qualities: "Kwaliteiten",
      programmingLanguages: "Programmeertalen",
      software: "Software",
      languages: "Talen",
      hobbies: "Hobby's",
    },
    abilities: {
      ...abilities,
      languages: [
        "Nederlands",
        "Engels",
      ],
    },
  },
  en: {
    headers: {
      qualities: "Qualities",
      programmingLanguages: "Programming languages",
      software: "Software",
      languages: "Languages",
      hobbies: "Hobbies",
    },
    abilities: {
      ...abilities,
      languages: [
        "Dutch",
        "English",
      ],
    },
  }
};



export function Abilities({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <Block>
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