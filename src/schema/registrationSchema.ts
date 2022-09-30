import * as yup from 'yup';

export const registrationSchema = yup.object({
  fullName: yup.string().required(),
  dob: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
});
