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
            <Card key={Math.random()} bg="dark">
              <Card.Body className="playerScoreCard">
                {players.length < 6 ? (
                  <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImageAdded"/>
                ) : (
                  <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImage"/>
                )}
                <Card.Title>{player.player}</Card.Title>
                <div className="flex-row justify-content-center align-items-center scoreCard">
                  <div className="scoreSize">{player.score}</div>
                  <div>
                    <div>
                    <Button variant="none" size="sm" onClick={() => addToScore(player)}>🔼</Button>
                    </div>
                    <div>
                    <Button variant="none" size="sm" onClick={() => subtractFromScore(player)}>🔽</Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </>
  );
};

export default Scoreboard;