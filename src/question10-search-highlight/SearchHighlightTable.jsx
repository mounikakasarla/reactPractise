import { useState } from 'react';
import HighlightText from './HighlightText.jsx';

const ADMINISTRATORS = [
  { id: 1, name: 'practise' },
  { id: 2, name: 'react practise' },
  { id: 3, name: 'John Smith' },
  { id: 4, name: 'Reactive Admin' },
  { id: 5, name: 'Priya Sharma' },
  { id: 6, name: 'Inactive User' },
];

const styles = {
  input: { width: '100%', padding: 8, marginBottom: 16, boxSizing: 'border-box' },
  table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' },
  th: {
    textAlign: 'left',
    padding: '10px 14px',
    background: '#f4f4f5',
    color: '#6b7280',
    fontWeight: 600,
    borderBottom: '1px solid #e5e7eb',
  },
  td: {
    padding: '14px',
    borderBottom: '1px solid #e5e7eb',
    // cut long text off with "..." like the reference
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default function SearchHighlightTable() {
  const [search, setSearch] = useState('');

  const term = search.trim();
  // Only show rows that contain the search text (case-insensitive)
  const rows = ADMINISTRATORS.filter((admin) =>
    admin.name.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <main className="app">
      <h1>Search highlight</h1>

      <input
        style={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search administrators (try "acti")'
      />

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Administrator Name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((admin) => (
            <tr key={admin.id}>
              <td style={styles.td} title={admin.name}>
                <HighlightText text={admin.name} search={term} />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td style={{ ...styles.td, color: '#9ca3af' }}>No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
