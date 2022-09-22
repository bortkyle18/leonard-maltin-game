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
      <div className="flex-row align-items-center justify-space-around text-center">
        {players.map((player) => {
          return(
            <Card key={Math.random()}>
              <Card.Body>
                {players.length < 6 ? (
                  <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImageAdded"/>
                ) : (
                  <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImage"/>
                )}
                <Card.Title>{player.player} - {player.score}</Card.Title>
                <Button variant="none" size="lg" onClick={() => subtractFromScore(player)}>🔽</Button>
                <Button variant="none" size="lg" onClick={() => addToScore(player)}>🔼</Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </>
  );
};

export default Scoreboard;