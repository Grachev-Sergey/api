import { app } from './app';
import { config } from './config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import succsessMessage from './utils/succsessMessage';
import { AppDataSource } from './db/dataSource';
import { onConnection } from './socket/onConnection';

(async () => {
  try {
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
      cors: {
        origin: `${config.frontUrl}`
      }
    });
    httpServer.listen(config.serverPort);
    console.log(succsessMessage.LISTENING, config.serverPort);
    io.on('connection', onConnection);
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
})()
