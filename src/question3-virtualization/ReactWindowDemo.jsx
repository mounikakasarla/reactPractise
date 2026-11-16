import { List } from 'react-window';

// Same 100,000 rows as the hand-written version, but react-window does the math.
const ITEMS = Array.from({ length: 100_000 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

// react-window calls this for each VISIBLE row only.
// - `style` positions the row: you MUST apply it.
// - `ariaAttributes`: spread it onto the row element.
// - `items` arrives through `rowProps` below.
function Row({ index, style, ariaAttributes, items }) {
  const item = items[index];
  return (
    <div
      {...ariaAttributes}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 12px',
        boxSizing: 'border-box',
        borderBottom: '1px solid #eee',
        background: index % 2 ? '#fafafa' : '#fff',
      }}
    >
      <strong>{item.name}</strong>
      <span style={{ opacity: 0.6 }}>{item.email}</span>
    </div>
  );
}

export default function ReactWindowDemo() {
  return (
    <main className="app">
      <h1>react-window</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        {ITEMS.length.toLocaleString()} rows rendered with the <code>List</code> component.
      </p>

      <List
        rowComponent={Row}        // component used for each row
        rowCount={ITEMS.length}   // total number of rows
        rowHeight={40}            // fixed height in px (a function also works)
        rowProps={{ items: ITEMS }} // extra props passed to every Row
        style={{ height: 400, border: '1px solid #ccc' }}
      />
    </main>
  );
}
