
export function BulletPointList({ content }: { content: string[] }) {
  return (
    <ul className='list-disc list-outside pl-5'>
      {
        content.map((item, i) =>
          <li key={i}>{item}</li>
        )
      }
    </ul>
  );
}
