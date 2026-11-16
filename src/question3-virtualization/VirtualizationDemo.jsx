import VirtualList from './VirtualList.jsx';

// 100,000 rows — rendering them all would freeze the page.
const ITEMS = Array.from({ length: 100_000 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const ROW_HEIGHT = 40;

export default function VirtualizationDemo() {
  return (
    <main className="app">
      <h1>Virtualized List</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        {ITEMS.length.toLocaleString()} rows, but only ~20 are in the DOM at a time.
        Inspect the list in DevTools while scrolling to see it.
      </p>

      <VirtualList
        items={ITEMS}
        rowHeight={ROW_HEIGHT}
        height={400}
        renderRow={(item, index) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              padding: '0 12px',
              borderBottom: '1px solid #eee',
              background: index % 2 ? '#fafafa' : '#fff',
            }}
          >
            <strong>{item.name}</strong>
            <span style={{ opacity: 0.6 }}>{item.email}</span>
          </div>
        )}
      />
    </main>
  );
}
