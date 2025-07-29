import Link from "next/link";
import React from "react";
import {twMerge} from "tailwind-merge";

type BlockProps = {
  children: React.ReactNode;
  className?: string;
}

export function Block({
  children,
  className,
}: Readonly<BlockProps>) {
  return (<>
    <div className={twMerge('bg-gray-700 m-3 p-5 print:p-2 rounded-3xl', className)}>
      { children }
    </div>
  </>);
}

export function LinkBlock({
  children,
  className,
  href,
}: Readonly<BlockProps & {href: string}>) {
  return (
    <Link className='m-3' href={href}>
      <Block className={twMerge('m-0 bg-blue-900 hover:scale-105 transition-transform', className)}>
        {children}
      </Block>
    </Link>
  )
}

export function CallbackBlock({
  children,
  className,
  onClick,
}: Readonly<BlockProps & {onClick: () => void}>) {
  return (
    <button onClick={onClick}>
      <Block className={twMerge('bg-blue-900 hover:scale-105 transition-transform', className)}>
        {children}
      </Block>
    </button>
  )
}