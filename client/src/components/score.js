import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Score = (props) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('players')));
  }, []);

  return (
    <div className="flex-row">
      {players.map((player) => {
        return(
          <Card key={Math.random()}>
            <Card.Body>
              <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImage"/>
              <Card.Title>{player.player}: {player.score}</Card.Title>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  );
};

export default Score;