import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.artists[1],
  };
  next();
});

app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/artists', (req, res) => {
  return res.send(Object.values(req.context.models.artists));
});

app.get('/artists/:artistID', (req, res) => {
  return res.send(req.context.models.artists[req.params.artistID]);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
