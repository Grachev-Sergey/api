import * as dotenv from 'dotenv';
import * as fs from 'fs';
// import * as path from 'path';

// const localEnv = dotenv.parse(fs.readFileSync(path.resolve(`${__dirname}/../.env`)));
// const defaultEnv = dotenv.parse(fs.readFileSync(path.resolve(`${__dirname}/../default.env`)));

const localEnv = dotenv.parse(fs.readFileSync('.env'));
const defaultEnv = dotenv.parse(fs.readFileSync('default.env'));

const combinedEnv = {
  ...localEnv,
  ...defaultEnv,
};

dotenv.config();

export const config = {
  serverPort: Number(combinedEnv.PORT),
  frontPort: Number(combinedEnv.FRONT),
  db: {
    name: combinedEnv.DB_NAME,
    user: combinedEnv.DB_USER,
    password: combinedEnv.DB_PASS,
    host: combinedEnv.DB_HOST,
    port: Number(combinedEnv.DB_PORT),
  },
  token: {
    secretKey: combinedEnv.TOKEN_SEKRET_KEY,
    expiresIN: combinedEnv.TOKEN_EXPIRES_IN,
  },
};
