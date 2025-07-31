import {Locale} from "@/i18n/routing";
import {Block} from "@/components/Block";
import {getDictKeys} from "@/utils/getDictKeys";
import {BulletPointList} from "@/components/BulletPointList";


const abilities = {
  programmingLanguages: [
    "All-round in C#",
    "ML/data/embedded/scripting in Python",
    "Web development in TypeScript/React/Next.js",
    "Android development in Kotlin/Jetpack Compose",
    "Game development in Godot/C#, GameMaker, Unity",
    "Game development in C++/OpenGL",
    "Databases in SQL, Neo4J",
    "All-round in Java",
  ],
  software: [
    "Git, GitHub, GitLab",
    "Visual Studio",
    "Visual Studio Code",
    "JetBrains IDEs (IntelliJ, Rider, WebStorm, PyCharm, ...)",
    "Adobe CC (Photoshop, Premiere Pro, After Effects, Illustrator, ...)",
    "Microsoft Office",
    "Figma",
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
      qualities: [
        "Creatief",
        "Assertief",
        "Proactief",
        "Enthousiast",
        "Nieuwsgierig",
        "Precies",
        "Kritisch",
      ],
      ...abilities,
      languages: [
        "Nederlands",
        "Engels",
      ],
      hobbies: [
        "Game development",
        "Pianospelen",
        "Muziekproductie",
        "Fotografie",
        "Theater",
      ]
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
      qualities: [
        "Creative",
        "Assertive",
        "Proactive",
        "Enthusiastic",
        "Curious",
        "Precise",
        "Critical",
      ],
      ...abilities,
      languages: [
        "Dutch",
        "English",
      ],
      hobbies: [
        "Game development",
        "Piano playing",
        "Music production",
        "Photography",
        "Theatre",
      ]
    },
  },
};



export function AbilitiesBlock({ locale }: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <Block>
      <h1>{dict.title}</h1>

      <section>
        {
          getDictKeys(dict.headers).map((header) =>
            <div key={header} className='mb-3'>
              <h2>{dict.headers[header]}</h2>
              <BulletPointList content={dict.abilities[header]}/>
            </div>
          )
        }
      </section>
    </Block>
  </>);
}