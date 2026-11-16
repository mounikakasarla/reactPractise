// Wraps the FIRST match of `search` inside `text` in a yellow <mark>.
// "activity test" + "acti"  →  <mark>acti</mark>vity test
export default function HighlightText({ text, search }) {
  if (!search) return text;

  const index = text.toLowerCase().indexOf(search.toLowerCase()); // case-insensitive
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + search.length); // keeps original casing
  const after = text.slice(index + search.length);

  return (
    <>
      {before}
      <mark style={{ background: 'yellow', color: 'inherit', padding: 0 }}>{match}</mark>
      {after}
    </>
  );
}
