const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const path = require('path');
const Player = require('./models/players.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//"mongodb://admin:password99@ds125031.mlab.com:25031/codingchallenge_pool"

mongoose.connect(process.env.MONGODB_URI);
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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use('/api', router);
//app.use(express.static(path.join(__dirname, 'client/build')));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
