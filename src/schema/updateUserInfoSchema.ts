import * as Yup from 'yup';

export const updateUserInfoSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Enter email'),
  fullName: Yup.string()
    .max(50, 'Name must not exceed 50 characters')
    .required('Enter full name'),
});
