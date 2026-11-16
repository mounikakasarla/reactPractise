import { useImperativeHandle, useRef } from 'react';

// React 19: `ref` is a normal prop, so forwardRef is not needed.
export default function CustomInput({ ref, ...props }) {
  const inputRef = useRef(null); // the real <input>, kept private

  // Decide what the PARENT gets when it uses ref.current
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = '';
      inputRef.current.focus();
    },
    getValue() {
      return inputRef.current.value;
    },
  }));

  return <input ref={inputRef} style={{ padding: 6, width: '100%' }} {...props} />;
}
