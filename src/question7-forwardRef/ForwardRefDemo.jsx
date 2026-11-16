import { forwardRef, useRef } from 'react';

// forwardRef passes the parent's ref through to the real <input>.
// Signature: forwardRef((props, ref) => JSX)  ← ref is the 2nd argument, not a prop
const FancyInput = forwardRef(function FancyInput({ label, ...props }, ref) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      {label}
      <input ref={ref} style={{ display: 'block', width: '100%', padding: 6 }} {...props} />
    </label>
  );
});

export default function ForwardRefDemo() {
  const nameRef = useRef(null);  // will point at the real DOM <input>
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Focus the first empty field
    if (!nameRef.current.value) return nameRef.current.focus();
    if (!emailRef.current.value) return emailRef.current.focus();
    alert(`Name: ${nameRef.current.value}\nEmail: ${emailRef.current.value}`);
  };

  return (
    <main className="app">
      <h1>forwardRef</h1>
      <p style={{ fontSize: 14, opacity: 0.7 }}>
        Submit with an empty field: the parent focuses it through the forwarded ref.
      </p>

      <form onSubmit={handleSubmit}>
        <FancyInput label="Name" ref={nameRef} />
        <FancyInput label="Email" ref={emailRef} type="email" />

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => emailRef.current.focus()}>Focus email</button>
        </div>
      </form>
    </main>
  );
}
