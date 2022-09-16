import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import GameNav from "../components/GameNave";


const Scoreboard = (props) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('players')));
  }, []);

  const addToScore = async (playerToChange) => {
    setPlayers(prevPlayer => {
      const updatePlayer = prevPlayer.map(player => {
        if (player.player === playerToChange.player) {
          return {...player, score: playerToChange.score + 1};
        }
        return player;
      });
      localStorage.setItem('players', JSON.stringify(updatePlayer));
      return updatePlayer;
    })
  };

  const subtractFromScore = (playerToChange) => {
    setPlayers(prevPlayer => {
      const updatePlayer = prevPlayer.map(player => {
        if (player.player === playerToChange.player) {
          return {...player, score: playerToChange.score - 1};
        }
        return player;
      });
      localStorage.setItem('players', JSON.stringify(updatePlayer));
      return updatePlayer;
    });
  };

  return (
    <>
      <GameNav/>
      {players.map((player) => {
        return(
          <Card key={Math.random()}>
            <Card.Body>
              <div>
                <Card.Title>{player.player}</Card.Title>
                <Card.Body>
                  {player.score}
                  <Button onClick={() => addToScore(player)}>🔼</Button>
                  <Button onClick={() => subtractFromScore(player)}>🔽</Button>
                </Card.Body>
              </div>
            </Card.Body>
          </Card>
        )
      })}
    </>
  );
};

export default Scoreboard;