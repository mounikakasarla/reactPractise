import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    else setDraft(todo.text); // revert empty edits
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') {
      setDraft(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`item ${todo.completed ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" complete`}
      />

      {isEditing ? (
        <input
          className="edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="text" onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <button onClick={() => setIsEditing(true)} aria-label="Edit">✏️</button>
      <button onClick={() => onDelete(todo.id)} aria-label="Delete">🗑️</button>
    </li>
  );
}
