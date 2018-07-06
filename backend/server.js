const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const Player = require('./models/players.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const API_PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://admin:password99@ds125031.mlab.com:25031/codingchallenge_pool");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/players', (req, res) => {
  Player.find((err, players) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: players });
  });
});

router.post('/players', (req, res) => {
  const player = new Player();
  const { name, wins } = req.body;
  if (!name) {
    return res.json({
      success: false,
      error: 'You must provide a name'
    });
  }

  player.name = name;
  player.wins = wins;

  player.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });

});

router.put('/players/:playerId', (req, res) => {
  const { playerId } = req.params;
  if (!playerId) {
    return res.json({ success: false, error: 'Player id not found' });
  }

  Player.findById(playerId, (error, player) => {
    if (error) return res.json({ success: false, error });
    const { wins } = req.body;
    if (wins !== null) player.wins = wins + 1;

    player.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true, player: player });
    });
  });
});

app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
