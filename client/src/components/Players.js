import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const Players = (props) => {
  const [ playerInput, setPlayerInput ] = useState("")

  const handleSavePlayer = async (e) => {
    e.preventDefault();

    const playerToSave = {
      player: playerInput,
      score: 0
    }

    props.setPlayers([...props.players, playerToSave])

    setPlayerInput("")
  }

  return (
    <>
      {props.players.length > 0 && (
        <h3>Players:</h3>
      )}
      {props.players.map((player) => {
        return (
          <div key={Math.random()}>
            <h4>{player.player}</h4>
            <Button
              className="btn-block"
              variant="danger"
              size="sm"
              onClick={ () => props.setPlayers(props.players.filter((players) => players !== player))}
            >
              Remove Player
            </Button>
          </div>
        )
      })}
      <h3>Add Players Below</h3>
      <Form onSubmit={handleSavePlayer}>
        <Form.Control
          name="playerInput"
          value={playerInput}
          onChange={(e) => setPlayerInput(e.target.value)}
          type="text"
          size="lg"
          placeholder="Enter Player Name"
          required
        />
        <Button type="submit" variant="success" size="sm">
          Save Player
        </Button>
      </Form>
    </>
  );
};

export default Players;