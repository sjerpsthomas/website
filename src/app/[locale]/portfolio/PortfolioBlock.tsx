'use client'

import {Block, CallbackBlock} from "@/components/Block";
import {twMerge} from "tailwind-merge";
import {useState} from "react";
import _ from "lodash";
import {Locale} from "@/api/locale";
import {PortfolioItem} from "@/api/portfolio";


const D = {
  nl: {
    title: "Portfolio",
  },
  en: {
    title: "Portfolio",
  },
}


export function PortfolioBlock({
  locale, items, tags
}: { locale: Locale, items: PortfolioItem[], tags: string[] }) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <div className='flex flex-col items-center mt-5'>
      {/* Title */}
      <h1>{dict.title}</h1>

      {/* Filter and items */}
      <FilterAndItems locale={locale} items={items} tags={tags}/>
    </div>
  </>);
}

function FilterAndItems({
  locale, items, tags
} : { locale: Locale, items: PortfolioItem[], tags: string[] }) {
  // Include 'all' as pseudo-tag
  const allTag = { nl: 'allemaal', en: 'all' }[locale];

  // Define filter state
  const [currentTag, setCurrentTag] = useState<string>(allTag);

  return (<>
    <div className='w-full md:w-[60%] md:min-w-[35rem] flex flex-col items-center'>
      {/* Filter */}
      <Filter locale={locale} tags={tags} allTag={allTag} currentTag={currentTag} setCurrentTag={setCurrentTag} />

      {/* Items */}
      <Block className='flex flex-col gap-y-10'>
        {/* Tag error */}
        <PortfolioItems items={items} allTag={allTag} currentTag={currentTag}/>
      </Block>
    </div>
  </>);
}

function Filter({
  locale, tags, allTag, currentTag, setCurrentTag
}: { locale: Locale, tags: string[], allTag: string, currentTag: string, setCurrentTag: (newCurrentTag: string) => void }) {
  const tagsAndAll = [
    allTag,
    ...tags
  ]

  return (
    <div className="flex flex-wrap justify-center print:hidden">
      {
        tagsAndAll.map((tag, tagIndex) =>
          <div key={tagIndex}>
            <CallbackBlock className={twMerge(currentTag == tag ? "bg-amber-300 text-black" : "bg-black", "md:py-3 md:m-1 shadow-lg")}
                           onClick={() => {
                             setCurrentTag(currentTag == tag ? allTag : tag);
                           }}>
              <p className='text-center'>{_.capitalize(tag)}</p>
            </CallbackBlock>
          </div>
        )
      }
    </div>
  );
}

function PortfolioItems({
  items, allTag, currentTag
}: { items: PortfolioItem[], allTag: string, currentTag: string }) {
  // Filter items
  const filteredItems = currentTag == allTag ? items : items.filter(item => item.tags.some(tag => tag == currentTag));

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
                <div key={tagIndex} className='bg-[#151515] px-2 py-1 rounded-lg shadow-md'>{_.lowerCase(tag) }</div>
              )}
            </div>
          </div>

          {/* Subtitle */}
          <div className='pl-5 mb-1'>
            <p className='italic'>{item.subtitle}</p>
          </div>

          {/* Description */}
          <p>{item.description}</p>

          {/* Links */}
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