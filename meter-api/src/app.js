import express from 'express';

import meterRouter from './routes/meter.route.js';

const app = express();

const error = (status, msg) => {
  const err = new Error(msg);
  err.status = status;
  return err;
};

app.use(express.json());

app.get('/status', (req, res) => {
  res.status(200).json({ alive: true });
});

app.use('/api', (req, res, next) => {
  const apiKey = req.query['api-key'];
  if (!apiKey) {
    return next(error(400, 'api key required'));
  }
  if (process.env.API_KEY !== apiKey) {
    return next(error(401, 'invalid api key'));
  }
  req.key = apiKey;
  return next();
});

app.use('/api', meterRouter);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'oooops... should have read the documentation' });
});

export default app;
