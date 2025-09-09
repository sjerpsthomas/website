
export function BulletPointList({ content }: { content: string[] }) {
  return (
    <ul>
      {content.map((item, i) =>
        <li key={i}>{item}</li>
      )}
    </ul>
  );
}
