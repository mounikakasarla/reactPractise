import { useState } from 'react';

// Renders only the rows visible in the scroll window (plus a small buffer),
// instead of mounting every item in the DOM.
export default function VirtualList({ items, rowHeight, height, overscan = 5, renderRow }) {
  const [scrollTop, setScrollTop] = useState(0);

  // Which rows are in view?
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const visibleCount = Math.ceil(height / rowHeight) + overscan * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const visibleItems = items.slice(startIndex, endIndex);

  return (
    // 1. Outer box: fixed height, scrollable
    <div
      style={{ height, overflowY: 'auto', border: '1px solid #ccc' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      {/* 2. Spacer: full height of ALL rows, so the scrollbar looks right */}
      <div style={{ height: items.length * rowHeight, position: 'relative' }}>
        {/* 3. Only the visible rows, shifted down to their real position */}
        <div style={{ transform: `translateY(${startIndex * rowHeight}px)` }}>
          {visibleItems.map((item, i) => (
            <div key={startIndex + i} style={{ height: rowHeight }}>
              {renderRow(item, startIndex + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
