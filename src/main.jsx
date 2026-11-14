import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TodoApp from './question1-todo/TodoApp.jsx'; // Question 1
import LocalStorageDemo from './question2-useLocalStorage/LocalStorageDemo.jsx'; // Question 2
import './index.css';

// Simple hash-based switcher so each question stays independent.
const QUESTIONS = {
  '#q1': { label: 'Q1: Todo App', Component: TodoApp },
  '#q2': { label: 'Q2: useLocalStorage', Component: LocalStorageDemo },
};

function Root() {
  const [hash, setHash] = useState(window.location.hash || '#q1');

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#q1');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const { Component } = QUESTIONS[hash] ?? QUESTIONS['#q1'];

  return (
    <>
      <nav style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingTop: 16 }}>
        {Object.entries(QUESTIONS).map(([h, { label }]) => (
          <a key={h} href={h} style={{ fontWeight: h === hash ? 'bold' : 'normal' }}>
            {label}
          </a>
        ))}
      </nav>
      <Component />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
