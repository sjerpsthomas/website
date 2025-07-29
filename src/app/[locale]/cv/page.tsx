import {Header} from "@/components/header/Header";
import {Locale} from "@/i18n/routing";
import {AbilitiesBlock} from "@/app/[locale]/cv/AbilitiesBlock";
import {ExperienceBlock} from "@/app/[locale]/cv/ExperienceBlock";


export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='cv' />

      {/* Content */}
      <main>

        <div className='flex flex-wrap justify-stretch items-stretch gap-y-5'>
          {/* Abilities */}
          <div className='flex-1 min-w-fit'>
            <AbilitiesBlock locale={locale}/>
          </div>

          {/* Abilities */}
          <div className='flex-1/4 min-w-fit'>
            <ExperienceBlock locale={locale}/>
          </div>
        </div>

      </main>
    </>
  );
}