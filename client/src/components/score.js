import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Score = (props) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('players')));
  }, []);

  console.log(players.length)

  return (
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
            </Card.Body>
          </Card>
        )
      })}
    </div>
  );
};

export default Score;