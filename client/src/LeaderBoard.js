import React, { Component } from 'react';
import 'whatwg-fetch';
import PlayerStats from './PlayerStats';
import { Button, Grid, Loader } from 'semantic-ui-react';

class LeaderBoard extends Component {
  state = {
    data: [],
    loading: true
  };

  componentDidMount() {
    this.loadPlayers();
  }

  toChoosePlayers = () => this.props.history.push("/chooseplayers");
  toAddPlayer = () => this.props.history.push("/addplayer");

  loadPlayers = () => {
    fetch('/api/players')
      .then(resp => resp.json())
      .then(resp => this.setState({data: resp.data, loading:false}));
  }

  render() {
    const {data, loading} = this.state;
    return (
      <div className="ui container">
        <div className="leaderboard">
          <h1>Leader Board</h1>
          <div className="stats">
            <Loader size="big" active={loading}/>
            <PlayerStats data={data} />
          </div>
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
