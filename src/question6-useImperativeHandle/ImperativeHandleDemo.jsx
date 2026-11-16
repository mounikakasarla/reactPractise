import { useRef, useState } from 'react';
import CustomInput from './CustomInput.jsx';

export default function ImperativeHandleDemo() {
  const inputRef = useRef(null); // will hold { focus, clear, getValue }
  const [shown, setShown] = useState('');

  return (
    <main className="app">
      <h1>useImperativeHandle</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        The parent calls methods the child chose to expose, not the raw DOM input.
      </p>

      <CustomInput ref={inputRef} placeholder="Type something" />

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button onClick={() => inputRef.current.focus()}>Focus</button>
        <button onClick={() => inputRef.current.clear()}>Clear</button>
        <button onClick={() => setShown(inputRef.current.getValue())}>Get value</button>
      </div>

      {shown && <p>Value: {shown}</p>}
    </main>
  );
}
