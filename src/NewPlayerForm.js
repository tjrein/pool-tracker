import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';

class NewPlayerForm extends Component {
  state = {
    name: '',
    wins: 0,
    toLeaderboard: false
  };

  handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  onSubmit = () => {
    console.log("this.state", this.state);
    fetch('http://localhost:3001/api/players', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(resp => this.setState({toLeaderboard: true}))
    .catch(error => console.log('Error:', error))
  }

  render() {
    const { name, toLeaderboard } = this.state;

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

    return (
      <div className="ui container">
        <div className="leaderboard">
          <h1>Add New Player</h1>
        </div>
        <div className="player-form">
        <Form inverted size="big" onSubmit={this.onSubmit}>
          <Form.Field>
            <label> Player Name</label>
            <input
              placeholder="Player Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Field>

        <div className="ui container center aligned">
          <Button circular inverted  size="huge" >Submit</Button>
        </div>
        </Form>
        </div>
      </div>
    );
  }
}

export default NewPlayerForm;
