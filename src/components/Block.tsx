import Link from "next/link";
import React from "react";
import classNames from "classnames";

type BlockProps = {
  children: React.ReactNode;
  className?: string;
}

export function Block({
  children,
  className,
}: Readonly<BlockProps>) {
  return (<>
    <div className={classNames('m-3 p-5 rounded-3xl', className)}>
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
      <Block className={classNames('!m-0 bg-blue-900 hover:scale-105 transition-transform', className)}>
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
      <Block className={classNames('bg-blue-900 hover:scale-105 transition-transform', className)}>
        {children}
      </Block>
    </button>
  )
}