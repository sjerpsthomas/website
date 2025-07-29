import './globals.css'
import {Comic_Neue} from "next/font/google";
import {twMerge} from "tailwind-merge";

const font = Comic_Neue({
  weight: '400'
});

export default async function NotFoundPage() {
  return (
    <html>
      <body className={twMerge(font.className, 'mt-36')}>
        <h1 className='rotate-[4deg] text-8xl mb-8 w-fit mx-auto'>Oops!</h1>
        <p className='-rotate-2 text-3xl w-fit mx-auto'>This page does not exist.</p>
      </body>
    </html>
  );
}
