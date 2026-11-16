import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// 1. Validation rules (one per field)
const SignupSchema = Yup.object({
  name: Yup.string().min(2, 'At least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .min(18, 'Must be 18 or older')
    .required('Age is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

// 2. Starting values (one per field)
const initialValues = {
  name: '',
  email: '',
  age: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

// Small helper: label + input + error message
function TextField({ label, name, type = 'text' }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block' }}>{label}</label>
      <Field name={name} type={type} style={{ width: '100%', padding: 6 }} />
      <ErrorMessage name={name} component="div" style={{ color: 'crimson', fontSize: 13 }} />
    </div>
  );
}

export default function SignupForm() {
  return (
    <main className="app">
      <h1>Formik + Yup</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        // 3. Runs only when every field is valid
        onSubmit={(values, { resetForm }) => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField label="Name" name="name" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Age" name="age" type="number" />
            <TextField label="Password" name="password" type="password" />
            <TextField label="Confirm password" name="confirmPassword" type="password" />

            <div style={{ marginBottom: 12 }}>
              <label>
                <Field name="terms" type="checkbox" /> I accept the terms
              </label>
              <ErrorMessage name="terms" component="div" style={{ color: 'crimson', fontSize: 13 }} />
            </div>

            <button type="submit" disabled={isSubmitting}>Sign up</button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
