import React, { Component } from 'react';
import 'whatwg-fetch';
import { Button, Grid } from 'semantic-ui-react';
import ToggleButton from './ToggleButton';
import { Redirect } from 'react-router-dom';

class Match extends Component {
  state = {
    winner: {},
    toLeaderboard: false
  };

  onClick = (e) => {
    const name = e.target.innerHTML;
    const players = this.props.location.state.players;
    const selectedPlayer = players.find(player => name === player.name);
    let winner = {};

    if (selectedPlayer.name !== this.state.winner.name) {
      winner = selectedPlayer;
    }

    this.setState({winner: winner});
  };

  updatePlayerWins = () => {
    const { _id, wins } = this.state.winner;

    if (!_id) {
      return;
    }

    fetch(`api/players/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({wins: wins}),
    })
    .then(resp => resp.json())
    .then(resp => this.setState({toLeaderboard: true}))
    .catch(error => console.log('Error:', error))
  };

  render() {
    const { players } = this.props.location.state;
    const { toLeaderboard, winner } = this.state;

    if (toLeaderboard) {
      return (
        <Redirect
          to={{
            pathname: '/leaderboard',
            state: {}
          }}
        />
      )
    }

    const toggleButtons = players.map(player => {
      let active = false;

      if (Object.keys(winner).length && player.name === winner.name) {
        active = true;
      }

      return (
        <Grid.Column textAlign="center">
          <Button basic circular size="big" inverted toggle active={active} onClick={this.onClick}>
            {player.name}
          </Button>
        </Grid.Column>
      )
    });

    const victoryButton = this.state.winner.name ? (
      <div className="ui container center aligned large-spacer">
        <Button inverted primary circular size="massive" onClick={this.updatePlayerWins}>Declare victory</Button>
      </div>
    ) : "";

    return (
      <div className="ui container">
        <div className="leaderboard">
          <h1> Choose a winner </h1>
        </div>
        <div className="match">
        <Grid stackable className="ui container" centered columns={3}>
          {toggleButtons[0]}
          <Grid.Column className="small-spacer" textAlign="center"><h2 className="vs">VS</h2></Grid.Column>
          {toggleButtons[1]}
        </Grid>
        </div>
        {victoryButton}
      </div>
    );
  }
}

export default Match;
