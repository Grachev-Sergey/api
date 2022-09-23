import userRoutes from './routes/user.routes';
import * as express from 'express';
import {CustomError} from './controllers/users.controllers'
export const app = express();

app.use(express.json());
app.use(userRoutes);

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.localData.status).json(err.localData)
  }
  
})