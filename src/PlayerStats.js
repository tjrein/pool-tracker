import React from 'react';
import { Grid } from 'semantic-ui-react';

const compare = (a, b) => {
  return a.wins < b.wins ?  1 :
         a.wins > b.wins ? -1 : 0;
};

const PlayerStats = (props) => {
  const styles = {};
  const playerNodes = props.data.sort(compare).map((player, ind) => (
    <Grid.Row className={ind < 3 ? "podium" : ""} columns={3}>
      <Grid.Column textAlign="center">
        <h4>{ind + 1}</h4>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <h4> {player.wins} </h4>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <h4> {player.name} </h4>
      </Grid.Column>
    </Grid.Row>
  ));

  return (
     <div className="stats">
       <Grid centered>
         <Grid.Row columns={3}>
           <Grid.Column textAlign="center">
             <h2>Rank</h2>
           </Grid.Column>
           <Grid.Column textAlign="center">
             <h2>Wins</h2>
           </Grid.Column>
           <Grid.Column textAlign="center">
             <h2>Name</h2>
           </Grid.Column>
         </Grid.Row>
          { playerNodes }
       </Grid>
     </div>
  );
};

export default PlayerStats;
