import { useForm } from 'react-hook-form';

const errorStyle = { color: 'crimson', fontSize: 13 };
const fieldStyle = { marginBottom: 12 };
const inputStyle = { width: '100%', padding: 6 };

export default function HookSignupForm() {
  const {
    register,      // connects an input to the form + its validation rules
    handleSubmit,  // runs validation, then calls onSubmit only if valid
    watch,         // reads a field's current value
    reset,         // clears the form
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', age: '', password: '', confirmPassword: '', terms: false },
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <main className="app">
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={fieldStyle}>
          <label>Name</label>
          <input
            style={inputStyle}
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'At least 2 characters' },
            })}
          />
          {errors.name && <div style={errorStyle}>{errors.name.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label>Email</label>
          <input
            type="email"
            style={inputStyle}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
          />
          {errors.email && <div style={errorStyle}>{errors.email.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label>Age</label>
          <input
            type="number"
            style={inputStyle}
            {...register('age', {
              required: 'Age is required',
              valueAsNumber: true, // gives a number instead of a string
              min: { value: 18, message: 'Must be 18 or older' },
            })}
          />
          {errors.age && <div style={errorStyle}>{errors.age.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label>Password</label>
          <input
            type="password"
            style={inputStyle}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          {errors.password && <div style={errorStyle}>{errors.password.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label>Confirm password</label>
          <input
            type="password"
            style={inputStyle}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              // custom rule: return true if OK, or an error message
              validate: (value) => value === watch('password') || 'Passwords must match',
            })}
          />
          {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword.message}</div>}
        </div>

        <div style={fieldStyle}>
          <label>
            <input type="checkbox" {...register('terms', { required: 'You must accept the terms' })} /> I
            accept the terms
          </label>
          {errors.terms && <div style={errorStyle}>{errors.terms.message}</div>}
        </div>

        <button type="submit" disabled={isSubmitting}>Sign up</button>
      </form>
    </main>
  );
}
