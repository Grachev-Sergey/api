import * as yup from 'yup';

export const registrationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});
