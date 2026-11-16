import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TodoApp from './question1-todo/TodoApp.jsx'; // Question 1
import LocalStorageDemo from './question2-useLocalStorage/LocalStorageDemo.jsx'; // Question 2
import VirtualizationDemo from './question3-virtualization/VirtualizationDemo.jsx'; // Question 3
import ReactWindowDemo from './question3-virtualization/ReactWindowDemo.jsx'; // Question 3b
import SignupForm from './question4-formik/SignupForm.jsx'; // Question 4
import HookSignupForm from './question5-react-hook-form/HookSignupForm.jsx'; // Question 5
import ImperativeHandleDemo from './question6-useImperativeHandle/ImperativeHandleDemo.jsx'; // Question 6
import ForwardRefDemo from './question7-forwardRef/ForwardRefDemo.jsx'; // Question 7
import AsyncThunkDemo from './question8-asyncThunk/AsyncThunkDemo.jsx'; // Question 8
import TanstackQueryDemo from './question9-tanstack-query/TanstackQueryDemo.jsx'; // Question 9
import SearchHighlightTable from './question10-search-highlight/SearchHighlightTable.jsx'; // Question 10
import CustomHooksDemo from './question11-custom-hooks/CustomHooksDemo.jsx'; // Question 11
import MemoCallbackDemo from './question12-useMemo-useCallback/MemoCallbackDemo.jsx'; // Question 12
import ThrottleDebounceDemo from './question13-throttle-debounce/ThrottleDebounceDemo.jsx'; // Question 13
import './index.css';

// Simple hash-based switcher so each question stays independent.
const QUESTIONS = {
  '#q1': { label: 'Q1: Todo App', Component: TodoApp },
  '#q2': { label: 'Q2: useLocalStorage', Component: LocalStorageDemo },
  '#q3': { label: 'Q3: Virtualization', Component: VirtualizationDemo },
  '#q3b': { label: 'Q3b: react-window', Component: ReactWindowDemo },
  '#q4': { label: 'Q4: Formik', Component: SignupForm },
  '#q5': { label: 'Q5: React Hook Form', Component: HookSignupForm },
  '#q6': { label: 'Q6: useImperativeHandle', Component: ImperativeHandleDemo },
  '#q7': { label: 'Q7: forwardRef', Component: ForwardRefDemo },
  '#q8': { label: 'Q8: createAsyncThunk', Component: AsyncThunkDemo },
  '#q9': { label: 'Q9: TanStack Query', Component: TanstackQueryDemo },
  '#q10': { label: 'Q10: Search highlight', Component: SearchHighlightTable },
  '#q11': { label: 'Q11: Custom hooks', Component: CustomHooksDemo },
  '#q12': { label: 'Q12: useMemo & useCallback', Component: MemoCallbackDemo },
  '#q13': { label: 'Q13: Throttle vs Debounce', Component: ThrottleDebounceDemo },
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
    <div className="layout">
      <nav className="sidebar">
        {Object.entries(QUESTIONS).map(([h, { label }]) => (
          <a key={h} href={h} className={h === hash ? 'active' : ''}>
            {label}
          </a>
        ))}
      </nav>
      <div className="content">
        <Component />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
