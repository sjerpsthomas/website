import './globals.css'
import {Comic_Neue} from "next/font/google";
import {twMerge} from "tailwind-merge";
import type {Metadata} from "next";

const font = Comic_Neue({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = { title: "404" };

export default async function NotFoundPage() {
  return (
    <html>
      <body className={twMerge(font.className, 'mt-36')}>
        <h1 className='rotate-[4deg] text-8xl mb-8 w-fit mx-auto'>oops!</h1>
        <p className='-rotate-2 text-3xl w-fit mx-auto'>this page does not exist.</p>
      </body>
    </html>
  );
}
