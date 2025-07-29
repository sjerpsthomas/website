import {Block} from "@/components/Block";
import {Locale} from "@/i18n/routing";


const D = {
  nl: {

  },
  en: {
  },
};

export function Footer({locale}: {locale: Locale}) {
  // Get dictionary
  const dict = D[locale];

  return (<>
    <footer className='mt-10 print:hidden'>
      <Block>
        Footer-dingen
      </Block>
    </footer>
  </>)
}
