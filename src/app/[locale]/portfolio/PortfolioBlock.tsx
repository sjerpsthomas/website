'use client'

import {Block, CallbackBlock} from "@/components/Block";
import {twMerge} from "tailwind-merge";
import {Locale} from "@/i18n/routing";
import {useEffect, useState} from "react";
import _ from "lodash";
import {QueryParamProvider, StringParam, useQueryParam, withDefault} from "use-query-params";
import NextAdapterApp from "next-query-params/app";

const allTags = ["solo", "team", "programming", "uni", "hobby", "association", "music"] as const;
type Tag = (typeof allTags)[number];

type Unlocalized = { nl: string, en: string }

const localizedTags: Record<Tag | 'all', Unlocalized> = {
  solo: { nl: "solo", en: "solo" },
  team: { nl: "in teamverband", en: "in a team" },
  programming: { nl: "programmeren", en: "programming" },
  uni: { nl: "universiteit", en: "university" },
  hobby: { nl: "hobby", en: "hobby" },
  association: { nl: "vereniging", en: "association" },
  music: { nl: "muziek", en: "music" },
  all: { nl: "allemaal", en: "all" },
}

type UnlocalizedItem = {
  title: Unlocalized;
  subtitle: Unlocalized;
  image?: string;
  tags: Tag[];
  description: Unlocalized;
  links: ({ text: Unlocalized, href: string })[];
}

type LocalizedItem = {
  title: string;
  subtitle: string;
  image?: string;
  tags: Tag[];
  description: string;
  links: ({ text: string, href: string })[];
}

function localize(item: UnlocalizedItem, locale: Locale): LocalizedItem {
  return {
    ...item,
    title: item.title[locale],
    subtitle: item.subtitle[locale],
    description: item.description[locale],
    links: item.links.map(link => ({ text: link.text[locale], href: link.href }))
  }
}

const I: UnlocalizedItem[] = [
  {
    title: { nl: "thomassjerps.nl", en: "thomassjerps.nl" },
    subtitle: { nl: "Website in React/TypeScript/Next.js", en: "Website using React/TypeScript/Next.js" },
    image: "/thomassjerps_nl.png",
    tags: ["solo", "programming"],
    description: {
      nl: "In de zomer van 2025 heb ik deze website gemaakt om mijn CV en portfolio in te zetten. Dit is 'm!",
      en: "In the summer of 2025, I created this website to showcase my resume and portfolio. This is it!"
    },
    links: [
      { text: { nl: "Repository", en: "Repository" }, href: "https://www.github.com/sjerpsthomas/website" },
    ],
  },
  {
    title: { nl: "Masterscriptie", en: "Master's thesis" },
    subtitle: { nl: "Onderzoeksproject in Godot/C#, React/TypeScript/Next.js, Python", en: "Research project using Godot/C#, React/TypeScript/Next.js, Python" },
    image: "/masterscriptie.jpg",
    tags: ["solo", "programming", "uni"],
    description: {
      nl: "Van november 2024 tot juli 2025 (30 weken) heb ik een zelf-gekozen onderzoek verricht voor mijn masterscriptie. " +
        "Ik heb verschillende algoritmen voor muziekgeneratie ('trading fours') geïmplementeerd en vergeleken " +
        "door middel van een zelf-opgestelde onderzoeksberaming, waarin spelers zichzelf beoordelen, en er beoordeling door" +
        " derde partijen en statistische technieken plaatsvindt.",
      en: "From November 2024 to July 2025 (30 weeks), I conducted a self-selected research project for my master's thesis. " +
        "I implemented and compared various music generation algorithms ('trading fours') using a " +
        "self-devised research framework, which included self-assessment of participants, supplemented with " +
        "third-party assessment, and assessment using statistical techniques."
    },
    links: [
      { text: { nl: "Repository", en: "Repository" }, href: "https://github.com/sjerpsthomas/miles" },
      { text: { nl: "Publicatie", en: "Publication" }, href: "https://repository.tudelft.nl/record/uuid:822728ff-9769-429f-9a88-0f2e960a26e4" },
    ],
  },
  {
    title: { nl: "Bartablet", en: "Bar tablet" },
    subtitle: { nl: "Een app om biertjes mee te bestellen in Kotlin/Jetpack Compose", en: "An app to tally beers in Kotlin/Jetpack Compose" },
    image: "/bartablet.png",
    tags: ["solo", "programming", "association"],
    description: {
      nl: "Bij mijn vereniging worden drankjes tijdens een borrel 'geturfd' en achteraf per (SEPA-) incasso betaald. " +
        "De vorige turf-app was slecht bruikbaar en on-onderhoudbaar. " +
        "In 2024 heb ik een nieuwe app gemaakt in Jetpack Compose die hierin verbetert, met zicht op de toekomst en " +
        "integratie met de (ook door ons bestuur gemoderniseerde) ledenadmin-, boekhoud- en incassoworkflow.",
      en: "At my association, drinks are tallied during drinks and paid for later by direct debit (SEPA). " +
        "The previous bar tablet app was difficult to use and maintain. So, in 2024, I created a new app in " +
        "Jetpack Compose that works better, with a future-proof view and integration with the membership administration, " +
        "accounting, and collection workflows (which we also modernized)."
    },
    links: [
      { text: { nl: "Repository", en: "Repository" }, href: "https://github.com/grooverjazz/bar" },
      { text: { nl: "Documentatie", en: "Documentation" }, href: "https://docs.google.com/document/d/13y2PimAA90RxNFoKKKYDVXsU0YkKKWx4LB_UWDWK3Qg" },
    ],
  },
  {
    title: { nl: "grooverjazz.nl", en: "grooverjazz.nl" },
    subtitle: { nl: "Onderhoud voor website in React/TypeScript/Next.js", en: "Website maintenance in React/TypeScript/Next.js" },
    image: "/grooverjazz_nl.png",
    tags: ["team", "programming", "association"],
    description: {
      nl: "In 2024 is een nieuwe website van mijn vereniging gelanceerd. De launch was overhaast gedaan, en dit " +
        "zorgde voor sub-par codekwaliteit en documentatie. In 2024-2025 heb ik veel pagina's beter op een lijn " +
        "geplaatst met het Figma-ontwerp, heb ik de zoekfunctie van een van de pagina's ('/bands') op de schop gegooid en " +
        "integratie met formulieren van de nieuwe ledenadministratie gefaciliteerd.",
      en: "In 2024, my association launched a new website. The launch was rushed, resulting in subpar code quality " +
        "and documentation. In 2024-2025, I aligned many pages more closely with the Figma design, " +
        "overhauled the search function on one of the pages ('/bands'), and facilitated integration with web forms " +
        "of new member administration software."
    },
    links: [
      { text: { nl: "Website", en: "Website" }, href: "https://www.grooverjazz.nl" },
      { text: { nl: "/bands", en: "/bands" }, href: "https://www.grooverjazz.nl/bands" },
    ],
  },
  {
    title: { nl: "Videospelletjes!", en: "Video games!" },
    subtitle: { nl: "Game dev in GameMaker, Godot, Unity", en: "Game dev in GameMaker, Godot, Unity" },
    image: "/videospelletjes.png",
    tags: ["solo", "programming", "hobby"],
    description: {
      nl: "Al sinds ik kind ben, ben ik geïnteresseerd in het maken van spelletjes. Ik ben mijn programmeercarrière " +
        "begonnen in GameMaker, en daar heb ik tot m'n 19e veel hobbyprojecten en game jams mee gedaan. " +
        "Later heb ik veel andere frameworks uitgeprobeerd (MonoGame, LWJGL) en ben ik doorgegaan met Godot. " +
        "De screenshot is van 'The Pironaut', hier heb ik een game jam mee gewonnen! " +
        "Bij de universiteit heb ik ook in een groepje een spelletje mogen maken in Unity.",
      en: "Ever since I was a child, I've been interested in creating games. I started my programming career in " +
        "GameMaker, and I used it for many hobby projects and game jams until I was 19. Later, I tried many other " +
        "frameworks (MonoGame, LWJGL) and then moved on to Godot. The screenshot is of 'The Pironaut,' which I " +
        "won a game jam with! For a university course, I also created a game in Unity in a small group."
    },
    links: [
      { text: { nl: "itch.io", en: "itch.io" }, href: "https://sjerpsthomas.itch.io/" },
      { text: { nl: "GM48 (GameMaker game jam)", en: "GM48 (GameMaker game jam)" }, href: "https://gm48.net/user/2/thomas-sjerps" },
      { text: { nl: "Videogame uni-project", en: "Video game uni project" }, href: "https://www.researchgate.net/publication/374175098" },
      { text: { nl: "Videogame voor vereniging", en: "Video game for association" }, href: "https://sjerpsthomas.github.io/" },
    ],
  },
  {
    title: { nl: "Minor: Topus", en: "Minor: Topus" },
    subtitle: { nl: "Interactief 'dier' in CircuitPython", en: "Interactive 'animal' in CircuitPython" },
    image: "/minor_topus.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Voor het eerste project van mijn minor Interactive Environments (bij Industrieel Ontwerpen van de TU) " +
        "moesten we (binnen een week) in groepjes van 2 een soort 'dier' maken van buigbaar plastic, en sensoren en motoren erin verwerken. " +
        "'Topus' reageert op hoe dichtbij je bent door steeds vaker en luider te gillen.",
      en: "For the first project of my Interactive Environments minor (in Industrial Design at TU Delft), we had to " +
        "work in pairs to create a kind of 'animal' out of flexible plastic within a week, incorporating sensors and motors. " +
        "'Topus' responds to your proximity by screeching more frequently and loudly."
    },
    links: [
      { text: { nl: "Video", en: "Video" }, href: "https://youtu.be/sB_sASpDmLU" },
    ],
  },
  {
    title: { nl: "Minor: Nenzo", en: "Minor: Nenzo" },
    subtitle: { nl: "Interactieve kijkgaten", en: "Interactive viewing holes" },
    image: "/minor_nenzo.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Het tweede deel van de minor bestond uit een grotere interactieve installatie, wederom in groepjes van 2. " +
        "De casus: de Koninklijke Bibliotheek in Den Haag wil meer mensen van buiten betrekken. " +
        "De oplossing: 'Nenzo' bestaat uit een oppervlak met kijkgaten, waar een bezoeker nieuwsverhalen kan zien. " +
        "Deze verhalen komen (door middel van een motortje en lus touw, en luider-wordende 'ambient' muziek) " +
        "steeds dichter bij de bezoeker. Ik was onder andere verantwoordelijk voor de motor-beweging en audio.",
      en: "The second part of the minor consisted of a larger interactive installation, again in pairs. " +
        "The brief: the Koninklijke Bibliotheek (National Library) in The Hague wants to involve more people from the outside world. " +
        "The solution: 'Nenzo' consists of a surface with peepholes through which visitors can view news stories. " +
        "These stories are brought closer and closer to the visitor (by means of a motor and loop of rope, " +
        "and increasingly louder ambient music). I was responsible for, among other things, the motor movement and audio."
    },
    links: [
      { text: { nl: "Poster", en: "Poster" }, href: "/portfolio/minor_nenzo.pdf" },
    ],
  },
  {
    title: { nl: "Minor: Reflect", en: "Minor: Reflect" },
    subtitle: { nl: "Videowand met Kinect in Godot/C#", en: "Video wall with Kinect in Godot/C#" },
    image: "/minor_reflect.jpg",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Het laatste en grootste deel van mijn minor (10 weken) was met dezelfde briefing van de Koninklijke Bibliotheek. " +
        "In een groepje van 6 hebben we een videomuur gemaakt die informatie over collecties van de bibliotheek toont " +
        "in de silhouetten van voorbijgangers (gerealiseerd met een Kinect). Ik heb voor dit project alle software gemaakt. " +
        "Het project heeft in 2024 een doorstart-budget gekregen, hoewel er intussen weinig is gebeurd. " +
        "De muur heeft nog wel een tijdje in het gebouw van de KB gestaan.",
      en: "The final and largest part of my minor (10 weeks) was based on the same briefing from the National Library. " +
        "In a group of six, we created a video wall that displays information about the library's collections using " +
        "the silhouettes of passersby (facilitated with a Kinect). I developed all the software for this project. " +
        "The project received a grant for continuation in 2024, though little has happened since then. " +
        "The wall remained in the National Library building for a while."
    },
    links: [
      { text: { nl: "Projectpagina", en: "Project page" }, href: "https://interactive-environments.nl/reflect/" },
      { text: { nl: "Repository", en: "Repository" }, href: "https://github.com/interactive-environments/2122-Reflect-flect-flect-flect" },
      { text: { nl: "Nieuwsartikel", en: "News article" }, href: "https://www.tudelft.nl/2022/io/januari/tu-delft-interactive-environments-minor-designs-for-national-librarys-digital-collection" },
    ],
  },
  {
    title: { nl: "Softwareproject", en: "Software Project" },
    subtitle: { nl: "IPC voor bedrijfssimulaties", en: "IPC for business simulations" },
    image: "/software_project.png",
    tags: ["team", "programming", "uni"],
    description: {
      nl: "Aan het einde van mijn tweede jaar van mijn bachelor heb ik in een groepje van 5 een softwareproject (10 weken) " +
        "gedaan bij TEEC2, een bedrijf dat specialiseert in optimalisatie van bedrijfsprocessen door middel van modellen. " +
        "Op basis van zo'n model hebben we een applicatie gemaakt die een persoon binnen een bedrijf simuleert. " +
        "Meerdere samenwerkende applicaties vormen een bedrijf, wat theoretische stress-testing mogelijk maakt. " +
        "Ik was verantwoordelijk voor de peer-to-peer communicatie via Nakama.",
      en: "At the end of my second year of my bachelor's degree, I worked in a group of five on a 10-week software " +
        "project at TEEC2, a company specializing in business process optimization using models. " +
        "Based on such a model, we created an application that simulates a person within a company. " +
        "Multiple applications working together form a company, enabling theoretical stress testing. " +
        "I was responsible for the peer-to-peer communication via Nakama."
    },
    links: [
      { text: { nl: "teec2.nl", en: "teec2.nl" }, href: "https://teec2.nl/" },
    ],
  },
  {
    title: { nl: "Bachelorscriptie", en: "Bachelor thesis" },
    subtitle: { nl: "Optimale 3D-diepteplaatjes", en: "Optimal 3D depth images" },
    image: "/bachelor_scriptie.png",
    tags: ["solo", "programming", "uni"],
    description: {
      nl: "Mijn bachelorscriptie duurde 10 weken, en bestond uit het testen van 'chromostereoscopie'-brillen. " +
        "Dit zijn geen 'normale' 3D-brillen: deze brillen buigen blauw licht naar je neus toe, en rood licht de andere kant op," +
        "waardoor de illusie van diepte ontstaat. " +
        "Mijn taak was om plaatjes statistisch te optimaliseren voor zowel 'dieptecontrast' als natuurgetrouwe kleuren.",
      en: "My bachelor's thesis lasted 10 weeks and consisted of testing chromostereoscopy glasses. " +
        "These aren't 'normal' 3D glasses: these glasses bend blue light toward your nose and red light the other way, " +
        "creating the illusion of depth. My task was to statistically optimize images for both depth contrast and true-to-life colors."
    },
    links: [
      { text: { nl: "Publicatie", en: "Publication" }, href: "https://repository.tudelft.nl/record/uuid:75fd3cb7-da3e-4ce7-8e2c-708303a3127c" },
    ],
  },
  {
    title: { nl: "Educool", en: "Educool" },
    subtitle: { nl: "Muziekproductie", en: "Music production" },
    image: "/educool.png",
    tags: ["music", "hobby"],
    description: {
      nl: "Bij de middelbare school heb je soms opdrachten die je creatief 'naar eigen vorm' kunt invullen. " +
        "Met die insteek is rap-duo Educool begonnen, waarin ik verantwoordelijk ben voor opname en muziekproductie. " +
        "We bestaan al 10 jaar en hebben 4 albums die op alle streamingdiensten staan, " +
        "maar ik zou er niet naar luisteren als ik jou was.",
      en: "In high school, you sometimes get assignments that you can creatively complete 'in your own way.' " +
        "With that in mind, we started the rap duo Educool, where I'm responsible for recording and music production. " +
        "We've been around for 10 years and have four albums that are on all streaming services, but I wouldn't listen to them if I were you."
    },
    links: [
      { text: { nl: "Spotify", en: "Spotify" }, href: "https://open.spotify.com/artist/5Ac67c0SMLpaQS5FZJeNsE" },
      { text: { nl: "Apple Music", en: "Apple Music" }, href: "https://music.apple.com/us/artist/educool/1504887773" },
      { text: { nl: "YouTube", en: "YouTube" }, href: "https://www.youtube.com/channel/UCBWdRQ-eiJ4QzuoV1K_sy5Q" },
    ],
  },
  {
    title: { nl: "Band: Tiewrap", en: "Band: Tiewrap" },
    subtitle: { nl: "Jazzduo", en: "Jazz duo" },
    image: "/tiewrap.jpg",
    tags: ["music", "association"],
    description: {
      nl: "Samen met mijn oud-bestuursgenoot Yiska zit ik in jazzduo Tiewrap. Zij zingt, ik speel piano. " +
        "We spelen vooral jazzstandards, en we zijn voor iedere gelegenheid te boeken!",
      en: "My fellow former board member Yiska and I are in the jazz duo Tiewrap. She sings, and I play piano. " +
        "We mainly play jazz standards, and we're available for any occasion!"
    },
    links: [
      { text: { nl: "Band-pagina", en: "Band page" }, href: "https://grooverjazz.nl/bands/Tiewrap" },
    ],
  },
  {
    title: { nl: "Band: Once More", en: "Band: Once More" },
    subtitle: { nl: "Jazz-combo", en: "Jazz-combo" },
    image: "/once_more.jpg",
    tags: ["music", "association"],
    description: {
      nl: "Ik speel keys in de vijfkoppige band Once More, ooit beschreven als een 'warme deken': " +
        "buiten traditionele jazz spelen we ook oude Disney-liedjes en wat meer funky dingen. " +
        "Op de foto hebben we net de 'Popdelft's Got You Covered'-prijs in ontvangst mogen nemen, voor het " +
        "beste arrangement van Umbrella van Rihanna (we hebben er een bossa nova van gemaakt)!",
      en: "I play keys in the five-piece band Once More, once described as a 'warm blanket': besides traditional jazz, " +
        "we also play old Disney songs and some funkier stuff. In the photo, we just received the 'Popdelft's Got You Covered'" +
        " award for the best arrangement of Rihanna's 'Umbrella' (we turned it into a bossa nova)!"
    },
    links: [
      { text: { nl: "Band-pagina", en: "Band page" }, href: "https://grooverjazz.nl/bands/Once%20More" },
    ],
  },
  {
    title: { nl: "Invaller/gelegenheids-gigs", en: "Substitute/occasional gigs" },
    subtitle: { nl: "Muziek maken voor een enkel optreden", en: "Making music for a single performance" },
    image: "/invallen.jpg",
    tags: ["music", "association"],
    description: {
      nl: "Als er bij een activiteit/betaalde gigaanvraag geen band in z'n geheel beschikbaar is, worden leden van " +
        "mijn vereniging soms individueel gevraagd of ze een 'gelegenheids-gig' kunnen spelen. " +
        "Dat is vaak super gezellig, dus heb ik dat ook een aantal keer gedaan. " +
        "Op de foto is het ons Ledenweekend, is het al 2 uur 's nachts, en bereid ik me voor op " +
        "een cantus waar men luidkeels Stevie Wonder mee gaat zingen. Ik heb amper kunnen repeteren. Ging prima.",
      en: "If a full band isn't available for an activity or paid gig request, members of my association are sometimes asked" +
        " individually if they can play an 'occasional gig.' That's often a lot of fun, so I've done that a few times. " +
        "In the photo, it's our Members' Weekend, it's already 2 AM, and I'm preparing for a cantus where everyone " +
        "will be singing Stevie Wonder at the top of their lungs. I barely had time to rehearse. It went well enough."
    },
    links: [],
  },
  {
    title: { nl: "bit.ly/niksaandehand", en: "bit.ly/niksaandehand" },
    subtitle: { nl: "Serie korte films", en: "Series of short films" },
    image: "/niksaandehand.png",
    tags: ["team", "hobby"],
    description: {
      nl: "Voor onze examenstunt in de zesde klas hebben we een reeks short films gemaakt, die door de dag heen verschenen. " +
        "Ik was verantwoordelijk voor filmen en montage, en de video's staan nog online!",
      en: "For our sixth-grade (17 years old) graduation stunt, we made a series of short films that aired throughout the day. " +
        "I was responsible for filming and editing, and the videos are still online!"
    },
    links: [
      { text: { nl: "bit.ly/niksaandehand", en: "bit.ly/niksaandehand" }, href: "https://bit.ly/niksaandehand" },
    ],
  },
  {
    title: { nl: "Fotografie", en: "Photography" },
    subtitle: { nl: "Portret, omgeving en optredens", en: "Portrait, environment and performances" },
    image: "/fotografie.png",
    tags: ["solo", "hobby"],
    description: {
      nl: "De afgelopen paar jaar ben ik steeds meer geïnteresseerd geraakt in fotografie, sinds ik de camera van m'n " +
        "vader kon lenen om foto's te maken voor mijn vereniging. De camera is een Nikon, en de nabewerking doe ik in Lightroom.",
      en: "Over the past few years, I've become increasingly interested in photography, ever since I was able to borrow " +
        "my father's camera to take photos for my association. The camera is a Nikon, and I do the post-processing in Lightroom."
    },
    links: [],
  },
  {
    title: { nl: "Groover Real Book", en: "Groover Real Book" },
    subtitle: { nl: "Volledig herzien repertoireboek in MuseScore", en: "Completely revised repertoire book in MuseScore" },
    image: "/realbook.png",
    tags: ["solo", "association"],
    description: {
      nl: "Als je samen jazz speelt, doe je dat vaak met 'standards': liedjes die iedereen kent. 'Real books' zijn " +
        "repertoireboekjes met populaire standards. Bij mijn vereniging hadden we er zelf 2 gemaakt. " +
        "Van die boekjes waren echter de oorspronkelijke bronnen verloren, waardoor correctie en aanpassing onmogelijk was. " +
        "Na honderden uren MusicXML importeren, handmatig overtikken en formatting gelijktrekken, heb ik er één mooi boekje van gemaakt " +
        "(met een mooie promotievideo!).",
      en: "When you play jazz together, you often do so with 'standards': songs everyone generally knows. 'Real books' " +
        "are repertoire booklets with popular standards. My assosiation had created two of them ourselves. " +
        "However, the original sources for those booklets had been lost, making correction and adaptation impossible. " +
        "After hundreds of hours of importing MusicXML, manual retyping, and formatting alignment, I managed to create one beautiful booklet " +
        "(with a self-made promotion video!)."
    },
    links: [
      { text: { nl: "Reveal-video", en: "Reveal video" }, href: "https://youtu.be/Oge_-XNskw8" },
    ],
  },
  {
    title: { nl: "Groover Top 2-Jazzend", en: "Groover Top 2-Jazzend" },
    subtitle: { nl: "Stemmen op 'De Lijst Der Lijsten' met Python", en: "Voting for 'The List of Lists' using Python" },
    image: "/top_2_jazzend.png",
    tags: ["solo", "programming", "association"],
    description: {
      nl: "Een leuk kerstproject tijdens mijn bestuursjaar! Leden mochten stemmen door een (Spotify Wrapped) " +
        "playlist in te leveren, en een door mij geschreven Python-script kon ze met behulp van de Spotify-API " +
        "samenvoegen tot één lijst: de Top 2-Jazzend!",
      en: "A fun Christmas project during my board year! " +
        "In the Netherlands, the 'Top 2000' is a national phenomenon where a publically-voted-for list of 2000 songs airs " +
        " on the radio, starting on Christmas morning, and ending at New Year's exactly. I wanted to do that for myself. " +
        "With the 'Top 2-Jazzend', members could vote by submitting a (Spotify Wrapped) playlist, " +
        "and a Python script I wrote, using the Spotify API, could merge them into a single list!"
    },
    links: [
      { text: { nl: "Top 2-Jazzend", en: "Top 2-Jazzend" }, href: "https://open.spotify.com/playlist/0l2uxk9gEZIPveqsheEwJ1" },
      { text: { nl: "Repository", en: "Repository" }, href: "https://github.com/grooverjazz/top-2-jazzend" },
    ],
  },
  {
    title: { nl: "Jaarboek", en: "Yearbook" },
    subtitle: { nl: "Layout en design van jaarboek", en: "Layout and design of yearbook" },
    image: "/jaarboek.png",
    tags: ["solo"],
    description: {
      nl: "In de zesde klas is er door mijn middelbare school een commissie opgesteld om het jaarboek te maken. " +
        "Omdat de commissie dat zelf niet kon, ben ik gevraagd om de layout en design van het jaarboek te maken. " +
        "Dat heb ik gedaan in Illustrator en InDesign. Voor de grap heb ik de kaft fel blauw gemaakt.",
      en: "In sixth grade (17 years old), my high school appointed a committee to create the yearbook. " +
        "Because the committee couldn't manage it themselves, I was asked to create the yearbook's layout and design. " +
        "I did this in Illustrator and InDesign. For fun, I made the cover bright blue."
    },
    links: [],
  },
  {
    title: { nl: "extremec4", en: "extremec4" },
    subtitle: { nl: "Vier op een Rij met HTML5/CSS/JS", en: "Connect Four with HTML5/CSS/JS" },
    image: "/extremec4.png",
    tags: ["team", "programming"],
    description: {
      nl: "Voor het vak 'Web and Database Management' in het eerste jaar van m'n studie heb ik in een groepje van " +
        "2 een clone van Vier op een Rij gemaakt met simpele web-technologieën. Ik was verantwoordelijk voor de " +
        "management van interne staat en communicatie tussen browservensters met WebSockets. En het logo.",
      en: "For the 'Web and Database Management' course in my first year of study, I worked with a group of two " +
        "to create a clone of Connect Four using simple web technologies. I was responsible for managing " +
        "internal state and communication between browser windows using WebSockets. And the logo."
    },
    links: [],
  },
  {
    title: { nl: "Stagemanager", en: "Stagemanager" },
    subtitle: { nl: "Verantwoordelijkheid bij (middel-)groot festival", en: "Responsibilities during (medium) large festival" },
    image: "/stagemanager.jpg",
    tags: ["team", "association"],
    description: {
      nl: "Ik ben in 2023 en 2024 stagemanager geweest voor het jaarlijkse festival van onze vereniging: 'Just Jazz'. " +
        "Als stagemanager was ik verantwoordelijk voor het draaiboek van mijn podium, communicatie met de bands " +
        "en het welzijn van het licht- en geluidpersoneel tijdens en na het ombouwen. " +
        "In 2023 waren er 1000 bezoekers en was ik verantwoordelijk voor het tweede podium; in 2024 waren er 600 " +
        "bezoekers en was ik verantwoordelijk voor de 'main stage'.",
      en: "In 2023 and 2024, I was the stage manager for our association's annual festival, 'Just Jazz.' As stage manager, " +
        "I was responsible for my stage's timeline, communication with the bands, and the well-being of the lighting " +
        "and sound crew during and after set- and instrument changes. In 2023, there were 1000 visitors and I was" +
        " responsible for the second stage; in 2024, there were 600 visitors and I was responsible for the main stage."
    },
    links: [
      { text: { nl: "justjazzfestival.nl", en: "justjazzfestival.nl" }, href: "https://justjazzfestival.nl/" },
    ],
  },
]

const D = {
  nl: {
    title: "Portfolio",
    items: I.map(item => localize(item, "nl")),
    tagError: "Incorrecte tag ingevoerd. Hoe krijg je dat voor elkaar?",
  },
  en: {
    title: "Portfolio",
    items: I.map(item => localize(item, "en")),
    tagError: "Incorrect tag specified. How'd you get that to happen?",
  },
}


export function PortfolioBlock({
  locale,
}: { locale: Locale }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <div className='flex flex-col items-center mt-5'>
      {/* Title */}
      <h1>{dict.title}</h1>

      {/* Filter and items */}
      <QueryParamProvider adapter={NextAdapterApp}>
        <FilterAndItems locale={locale}/>
      </QueryParamProvider>
    </div>
  </>);
}

function FilterAndItems({locale} : {locale: Locale}) {
  // Get dictionary
  const dict = D[locale];

  // Define filter state
  const [currentTag, setCurrentTag] = useQueryParam('tag', withDefault(StringParam, 'all'));

  return (<>
    <div className='w-full md:w-[60%] md:min-w-[35rem] flex flex-col items-center'>
      {/* Filter */}
      <Filter locale={locale} currentTag={currentTag as (Tag | 'all')} setCurrentTag={setCurrentTag} />

      {/* Items */}
      <Block className='flex flex-col gap-y-10'>
        {/* Tag error */}
        { ['all', ...allTags].includes(currentTag) || <div>{dict.tagError}</div> }

        <PortfolioItems locale={locale} currentTag={currentTag as (Tag | 'all')}/>
      </Block>
    </div>
  </>);
}

function Filter({
  locale, currentTag, setCurrentTag
}: { locale: Locale, currentTag: Tag | 'all', setCurrentTag: (newCurrentTag: Tag | 'all') => void }) {
  const buttonTags: (Tag | 'all')[] = (['all', ...allTags])

  return (
    <div className="flex flex-wrap justify-center print:hidden">
      {
        buttonTags.map((tag, tagIndex) =>
          <CallbackBlock key={tagIndex}
                         className={twMerge(currentTag == tag ? "bg-amber-300 text-black" : "bg-black", "md:py-3 md:m-1 shadow-lg")}
                         onClick={() => {
                           setCurrentTag(currentTag == tag ? 'all' : tag);
                         }}>
            <p className='text-center'>{_.capitalize(localizedTags[tag][locale])}</p>
          </CallbackBlock>
        )
      }
    </div>
  );
}

function PortfolioItems({
  locale, currentTag
}: { locale: Locale, currentTag: Tag | 'all' }) {
  // Get dictionary
  const dict = D[locale];

  // Get items, filter
  const items = dict.items;
  const filteredItems = currentTag == 'all' ? items : items.filter(it => it.tags.includes(currentTag));

  return filteredItems.map((item, index) => {
    const flip = index % 2 == 0;

    return (
      <section key={item.title} className=''>
        <div className={twMerge('w-[80%] md:w-[60%] print:w-[50%]', flip && 'ml-auto')}>
          <img src={item.image ?? "/foto.png"} alt=""
               className='w-full mb-4 object-cover rounded-xl shadow-heavy'/>

          {/* Title and tags */}
          <div className='flex flex-col print:flex-row print:flex-wrap justify-between gap-y-1 mb-2'>
            <h2>{item.title}</h2>
            <div className='pl-5 flex flex-wrap gap-x-3 gap-y-1'>
              {item.tags.map((tag, tagIndex) =>
                <div key={tagIndex} className='bg-[#151515] px-2 py-1 rounded-lg shadow-md'>{localizedTags[tag][locale]}</div>
              )}
            </div>
          </div>

          <p className='pl-5 italic mb-1'>{item.subtitle}</p>

          <p>{item.description}</p>

          {
            item.links.length > 0 && <div className='mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 print:hidden'>
              <p>Links:</p>
              {item.links.map((link, tagIndex) =>
                <a key={tagIndex} href={link.href}
                   className='bg-blue-900 px-2 py-1 rounded-lg shadow-md hover:scale-105 transition-transform'>{link.text}</a>
              )}
            </div>
          }
        </div>
      </section>
    );
  });
}