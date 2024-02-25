import app from './app.js';

const port = process.env.EXPRESS_PORT || 3001;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}.`);
});
