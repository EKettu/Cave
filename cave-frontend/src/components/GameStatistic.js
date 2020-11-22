import React from 'react';

const GameStatistic = ({ games }) => {

    const latestGame = games[games.length-1]

    if(games.length!==0) {
        return (
            <div>
                <h3>Games played in total</h3>
                {games.length}
                <h4>Latest game</h4>
                <p>Batteries used: {latestGame.batteries_used}</p>
                <p>Result: {latestGame.player_won ? "Player won" : "Monsters won"}</p>
            </div>
        );
    }
    return (
        <div>

        </div>

    );
  }

export default GameStatistic;