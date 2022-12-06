import * as Yup from 'yup';

const updateUserPassSchema = Yup.object({
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

const updateUserInfoSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Enter email'),
  fullName: Yup.string()
    .max(50, 'Name must not exceed 50 characters')
    .required('Enter full name'),
});

const updateUserPhotoSchema = Yup.object({
  userId: Yup.number().required('User id obligatory'),
  avatar: Yup.string().required('New avatar obligatory'),
});

const deleteUserSchema = Yup.object({
  userId: Yup.string().required('User id obligatory'),
});

export default {
  updateUserInfoSchema,
  updateUserPassSchema,
  updateUserPhotoSchema,
  deleteUserSchema,
};

export type UpdateUserSchemaType = typeof updateUserPassSchema |
typeof updateUserInfoSchema | typeof updateUserPhotoSchema | typeof deleteUserSchema;
