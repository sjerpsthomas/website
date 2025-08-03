import {Header} from "@/components/header/Header";
import {Locale} from "@/i18n/routing";


export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  // Get locale
  const locale = (await params).locale as Locale;

  return (
    <>
      {/* Header */}
      <Header locale={locale} currentPage='home'/>

      {/* Content */}
      <main>
        {/* TODO */}
      </main>
    </>
  );
}
