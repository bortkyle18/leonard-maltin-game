import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Score = (props) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('players')));
  }, []);

  return (
    <>
      {players.map((player) => {
        return(
          <Card key={Math.random()}>
            <Card.Body>
              <Card.Title>{player.player}: {player.score}</Card.Title>
            </Card.Body>
          </Card>
        )
      })}
    </>
  );
};

export default Score;