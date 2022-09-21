import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Card, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import FightClub from '../assets/images/FightClub.png'
import SpaceOd from '../assets/images/SpaceOd.png'
import KillBill from '../assets/images/KillBill.png'
import LOTR from '../assets/images/LOTR.png'

const Players = (props) => {
  const [ playerInput, setPlayerInput ] = useState("")
  const [ imageInput, setImageInput ] = useState({value: "", image: ""})

  const movieImages = [
    { value: 'FightClub', image: FightClub },
    { value:'SpaceOd', image: SpaceOd },
    { value: 'KillBill', image: KillBill },
    { value: 'LOTR', image: LOTR }
  ];

  const handleSavePlayer = async (e) => {
    e.preventDefault();

    const playerToSave = {
      playerImage: imageInput,
      player: playerInput,
      score: 0
    }

    props.setPlayers([...props.players, playerToSave])

    setPlayerInput("")
    setImageInput({value: "", image: ""})
  }

  return (
    <>
      {props.players.length > 0 && (
        <h3>Players:</h3>
      )}
      <div className="flex-row">
      {
        props.players.map((player) => {
        return (
          <Card key={Math.random()}>
            <Card.Body className="text-center">
              <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImage"/>
              <h4>{player.player}</h4>
              <Button
                className="btn-block"
                variant="danger"
                size="sm"
                onClick={ () => props.setPlayers(props.players.filter((players) => players !== player))}
              >
                Remove Player
              </Button>
            </Card.Body>
          </Card>
        )
      })}
      </div>

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
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Icon Selected: 
              {imageInput.value.length > 0 && <img src={imageInput.image} alt={imageInput.value} className="playerImage"/>}
            </Accordion.Header>
            <Accordion.Body className="flex-row">
              {movieImages.map((movieImage) => {
                return (
                  <Card key={movieImage._id}>
                    <img src={movieImage.image} alt={movieImage.value} className="playerImage"/>
                    <Button
                      className="btn-block"
                      variant="success"
                      onClick={ () => setImageInput({value: movieImage.value, image: movieImage.image})}
                    >
                      Select Icon
                    </Button>
                  </Card>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button type="submit" variant="success" size="sm"
          disabled={!playerInput}>
          Save Player
        </Button>
      </Form>
    </>
  );
};

export default Players;