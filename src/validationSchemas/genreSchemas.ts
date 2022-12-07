import * as Yup from 'yup';

const addGenreSchema = Yup.object({
  name: Yup.string().required('Genre name required'),
});

export default {
  addGenreSchema,
};

export type GenreSchemaType = typeof addGenreSchema;
