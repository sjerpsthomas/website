import Link from "next/link";
import React from "react";

type BlockProps = {
  children: React.ReactNode;
  className?: string;
}

export function Block({
  children,
  className,
}: Readonly<BlockProps>) {
  return (<>
    <div className={`${className ?? ''} m-3 p-5 rounded-3xl`}>
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
    <Link href={href}>
      <Block className={`${className ?? ''} bg-blue-900 hover:scale-105 transition-transform`}>
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
      <Block className={`${className ?? ''} bg-blue-900 hover:scale-105 transition-transform`}>
        {children}
      </Block>
    </button>
  )
}