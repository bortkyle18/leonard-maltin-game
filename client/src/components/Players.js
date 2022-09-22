import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Card, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Blank from '../assets/images/Blank.png'
import FightClub from '../assets/images/FightClub.png'
import SpaceOd from '../assets/images/SpaceOd.png'
import KillBill from '../assets/images/KillBill.png'
import LOTR from '../assets/images/LOTR.png'

const Players = (props) => {
  const [ playerInput, setPlayerInput ] = useState("")
  const [ imageInput, setImageInput ] = useState({value: "", image: Blank})

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
    setImageInput({value: "", image: Blank})
  }

  return (
    <div className="setUpSelect">
      <h3>Add Players</h3>

      <div className="flex-row justify-space-around">
        <Dropdown>
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            <img src={imageInput.image} alt={imageInput.value} className="playerImage"/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <div className="iconSelect">
              {movieImages.map((movieImage) => {
                return (
                    <Button
                      className="btn-block"
                      variant="none"
                      onClick={ () => setImageInput({value: movieImage.value, image: movieImage.image})}
                    >
                      <img src={movieImage.image} alt={movieImage.value} className="playerImage"/>
                    </Button>
                );
              })}
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form onSubmit={handleSavePlayer} className="flex-row align-items-center justify-space-around col-10">
          <div className="col-9">
              <Form.Control
                name="playerInput"
                value={playerInput}
                onChange={(e) => setPlayerInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Enter Player Name"
                required
              />
          </div>
          <div>
            <Button type="submit" id="success-btn" variant="none" size="lg"
              disabled={!playerInput}>
              Save Player
            </Button>
          </div>
        </Form>
      </div>
      
      {props.players.length > 0 && (
        <h3>Players:</h3>
      )}
      <div className="flex-row align-items-center justify-space-around">
        {
          props.players.map((player) => {
          return (
            <div>
            <Card key={Math.random()} bg="dark">
              <Card.Body className="text-center playerCard">
                <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImageAdded"/>
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
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Players;