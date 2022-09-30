import { app } from './app';
import { config } from './config';
import { AppDataSource } from './db/data-source';

async function main() {
  try {
    await AppDataSource.initialize();
    console.log(config.apiMessage.CONECTING);
    app.listen(config.serverPort);
    console.log(config.apiMessage.LISTENING, config.serverPort);
  } catch (error) {
    console.log(error);
  }
}
main();
