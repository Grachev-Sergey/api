import * as dotenv from 'dotenv';
import * as path from 'path';

const localEnv = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed;

const combinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

dotenv.config();

export const config = {
  serverPort: Number(combinedEnv.PORT),
  frontPort: Number(combinedEnv.FRONT_PORT),
  baseUrl: combinedEnv.BASE_URL,
  db: {
    name: combinedEnv.DB_NAME,
    user: combinedEnv.DB_USER,
    password: combinedEnv.DB_PASS,
    host: combinedEnv.DB_HOST,
    port: Number(combinedEnv.DB_PORT),
  },
  token: {
    secretKey: combinedEnv.TOKEN_SEKRET_KEY,
    expiresIn: combinedEnv.TOKEN_EXPIRES_IN,
  },
};
