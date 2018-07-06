import React, { Component } from 'react';
import 'whatwg-fetch';
import PlayerStats from './PlayerStats';
import { Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.loadPlayers();
  }

  toChoosePlayers = () => this.props.history.push("/chooseplayers");
  toAddPlayer = () => this.props.history.push("/addplayer");

  loadPlayers = () => {
    fetch('http://localhost:3001/api/players', {mode: "cors"})
      .then(resp => resp.json())
      .then(resp => this.setState({data: resp.data}));
  }

  render() {
    return (
      <div textAlign="center" className="ui container">
        <div className="leaderboard">
            <h1>Leader Board</h1>
          <PlayerStats data={this.state.data} />
        </div>
        <Grid centered>
           <Grid.Row columns={1}>
             <Grid.Column textAlign="center">
               <Button circular inverted size="massive" onClick={this.toChoosePlayers}> Play a Match </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button circular inverted size="massive" onClick={this.toAddPlayer}> Add Player </Button>
           </Grid.Column>
         </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LeaderBoard;