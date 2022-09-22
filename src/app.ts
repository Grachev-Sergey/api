import userRoutes from './routes/user.routes';
const express = require("express");

export const app = express();

app.use(express.json());
app.use(userRoutes);