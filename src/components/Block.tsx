

export function Block({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (<>
    <div className={`${className ?? ''} m-5 p-5 background-red`}>
      { children }
    </div>
  </>);
}