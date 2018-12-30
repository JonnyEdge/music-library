const express = require('express');
const artistsRouter = require('./routes/artistsroute');

const app = express();

app.use(express.json());
app.use('/', artistsRouter);

app.get('*', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

module.exports = app;
