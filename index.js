require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const shortid = require('shortid');
const Game = require('./models/game');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'cave-frontend/build')));

app.get('/api/games', (req, res) => {
  Game.find({}).then(games => {
    res.json(games.map(game => game.toJSON()));
  });
});

app.post('/api/games', (req, res, next) => {
  const body = req.body;
  const game = new Game({
    id: shortid.generate(),
    date: body.date,
    player_won: body.player_won,
    batteries_used: body.batteries_used
  });
  game.save().then(savedGame => {
    res.json(savedGame);
  })
  .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/cave-frontend/build/index.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});