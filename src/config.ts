import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  serverPort: Number(process.env.PORT),
  front: Number(process.env.PORT),
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
  token: {
    secretKey: process.env.TOKEN_SEKRET_KEY,
    expiresIN: process.env.TOKEN_EXPIRES_IN,
  },
  apiMessage: {
    CONECTING: 'Database conected',
    LISTENING: 'Server is listening on port',
    LOGIN_SUCCESS: 'Login completed successfully',
    REGISTRATION_SUCCESS: 'Registration completed successfully',
    DELETED: 'User deleted',
    UPDATE_USER: 'User data updated successfully',
    BOOK_ADDED: 'Book added',
    BOOK_DELETED: 'Book deleted',
  },
};
