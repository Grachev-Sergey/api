import * as Yup from 'yup';

export const updateUserPassSchema = Yup.object({
  oldPassword: Yup.string()
    .min(6, 'must be more than 6 characters')
    .required('Enter password'),
  newPassword: Yup.string()
    .min(6, 'must be more than 6 characters')
    .notOneOf([Yup.ref('oldPassword')], 'The new password must not match the old one.')
    .required('Enter new password'),
  repeatedNewPassword: Yup.string()
    .min(6, 'must be more than 6 characters')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Repeated new password'),
});
