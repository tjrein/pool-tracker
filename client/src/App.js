import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LeaderBoard from './LeaderBoard';
import NewPlayerForm from './NewPlayerForm';
import ChoosePlayers from './ChoosePlayers';
import Match from './Match';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={LeaderBoard} />
        <Route path="/leaderboard" exact component={LeaderBoard} />
        <Route path="/addplayer" exact component={NewPlayerForm} />
        <Route path="/chooseplayers" exact component={ChoosePlayers} />
        <Route path="/match" exact component={Match} />
      </div>
    );
  }
}

export default App;
