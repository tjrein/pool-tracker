import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class ToggleButton extends Component {
  state = {}

  handleClick = () => {
    this.setState({ active: !this.state.active });
    this.props.callback(this.props.name);
  }

  render() {
    const { active } = this.state;

    return (
      <Button basic circular size="big" inverted disabled={this.props.disabled} toggle active={active} onClick={this.handleClick}>
        {this.props.name}
      </Button>
    )
  }
}

export default ToggleButton;
