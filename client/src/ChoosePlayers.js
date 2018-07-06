import React, { Component } from 'react';
import 'whatwg-fetch';
import PlayerStats from './PlayerStats';
import { Redirect } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import ToggleButton from './ToggleButton';

class ChoosePlayers extends Component {
  state = {
    data: [],
    selectedPlayers: [],
    toMatch: false
  };

  componentDidMount() {
   this.loadPlayers();
  }

  onClick = (name) => {
    let selectedPlayers = this.state.selectedPlayers;
    const index = selectedPlayers.indexOf(name);

    if (index > -1) {
      selectedPlayers.splice(index, 1)
    }

    if (selectedPlayers.length < 2 && index < 0) {
      selectedPlayers.push(name);
    }

    this.setState({"selectedPlayers": selectedPlayers});
  }

  startGame = () => this.setState({toMatch: true});

  loadPlayers = () => {
    fetch('api/players')
      .then(data => data.json())
      .then(response => this.setState({data: response.data}));
  }

  render() {
    const {data, selectedPlayers, toMatch} = this.state;

    if (toMatch && selectedPlayers.length === 2) {
      return (
        <Redirect
          to={{
            pathname: '/match',
            state: {players: selectedPlayers, data: data}
          }}
        />
      )
    }

    const playerNodes = data.map((player, index) => {
      let disabled = false;
      if (selectedPlayers.length === 2) {
        if(selectedPlayers.indexOf(player.name) < 0) {
          disabled = true;
        }
      }

      return (
        <Grid.Column floated="left" textAlign="center">
          <ToggleButton
            name={player.name}
            disabled={disabled}
            id={player.name}
            callback={this.onClick}
          />
        </Grid.Column>
      )
    });

    const startButton = selectedPlayers.length === 2 ? (
      <div className="ui container center aligned large-spacer">
        <Button circular primary inverted size="massive" onClick={this.startGame}>Begin Match</Button>
      </div>
    ) : "";

    return (
      <div className="ui container">
        <div className="leaderboard">
          <h1>Choose Players</h1>
        </div>
        <div className="selection">
        <Grid stackable centered columns={2}>
          {playerNodes}
        </Grid>
        </div>
        {startButton}
      </div>
    );
  }
}

export default ChoosePlayers;
