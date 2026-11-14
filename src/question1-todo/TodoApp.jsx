import { useEffect, useState } from 'react';
import TodoForm from './TodoForm.jsx';
import TodoItem from './TodoItem.jsx';

const FILTERS = {
  all: () => true,
  active: (t) => !t.completed,
  completed: (t) => t.completed,
};

const STORAGE_KEY = 'todos';

export default function App() {
  // Lazy initializer: read localStorage only once, on first render
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all');

  // Persist whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Always use functional updates + immutable patterns
  const addTodo = (text) =>
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);

  const toggleTodo = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const editTodo = (id, text) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () =>
    setTodos((prev) => prev.filter((t) => !t.completed));

  // Derived state — computed, not stored
  const visibleTodos = todos.filter(FILTERS[filter]);
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <h1>Todos</h1>
      <TodoForm onAdd={addTodo} />

      {todos.length === 0 ? (
        <p className="empty">Nothing to do yet 🎉</p>
      ) : (
        <ul className="list">
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={editTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span>
            {remaining} item{remaining !== 1 && 's'} left
          </span>
          <div className="filters">
            {Object.keys(FILTERS).map((f) => (
              <button
                key={f}
                className={f === filter ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button onClick={clearCompleted} disabled={remaining === todos.length}>
            Clear completed
          </button>
        </footer>
      )}
    </main>
  );
}
