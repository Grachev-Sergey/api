import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Enter email'),
  password: Yup.string()
    .min(6, 'must be more than 6 characters')
    .required('Enter password'),
  repeatedPassword: Yup.string()
    .min(6, 'must be more than 6 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Repeated password'),
});
