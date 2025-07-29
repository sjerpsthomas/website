import {Header} from "@/components/header/Header";
import {Locale} from "@/i18n/routing";
import {Abilities} from "@/app/[locale]/cv/Abilities";


export default async function CVPage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='cv' />

      {/* Content */}
      <main>

        <div>
          {/* Abilities */}
          <Abilities locale={locale}/>
        </div>

      </main>
    </>
  );
}