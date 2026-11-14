import { useState } from 'react';

// Controlled input: React state is the single source of truth
export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo"
        autoFocus
      />
      <button type="submit">Add</button>
    </form>
  );
}

