import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Card, Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Blank from '../assets/images/Blank.png'

import Batman from '../assets/images/Batman.png'
import BeatleJuice from '../assets/images/BeatleJuice.png'
import BigL from '../assets/images/BigL.png'
import BreakfastTiff from '../assets/images/BreakfastTiff.png'
import CharlieChoc from '../assets/images/CharlieChoc.png'
import CTHD from '../assets/images/CTHD.png'
import DevilWears from '../assets/images/DevilWears.png'
import ESOSM from '../assets/images/ESOSM.png'
import FightClub from '../assets/images/FightClub.png'
import HarryPotter from '../assets/images/HarryPotter.png'
import JamesBond from '../assets/images/JamesBond.png'
import KillBill from '../assets/images/KillBill.png'
import KKid from '../assets/images/KKid.png'
import LegallyBlonde from '../assets/images/LegallyBlonde.png'
import LOTR from '../assets/images/LOTR.png'
import LOTRGand from '../assets/images/LOTRGand.png'
import LOTRSar from '../assets/images/LOTRSar.png'
import LWAW from '../assets/images/LWAW.png'
import Matrix from '../assets/images/Matrix.png'
import MeanGirls from '../assets/images/MeanGirls.png'
import OneFlewOver from '../assets/images/OneFlewOver.png'
import PulpF from '../assets/images/PulpF.png'
import RememberT from '../assets/images/RememberT.png'
import ShawS from '../assets/images/ShawS.png'
import SpaceOd from '../assets/images/SpaceOd.png'
import StarWars from '../assets/images/StarWars.png'
import VforVen from '../assets/images/VforVen.png'
import WizOz from '../assets/images/WizOz.png'
import Zoolander from '../assets/images/Zoolander.png'

const Players = (props) => {
  const [ playerInput, setPlayerInput ] = useState("")
  const [ imageInput, setImageInput ] = useState({value: "", image: Blank})

  const movieImages = [
    { value: 'Batman', image: Batman },
    { value:'BeatleJuice', image: BeatleJuice },
    { value: 'BigL', image: BigL },
    { value: 'BreakfastTiff', image: BreakfastTiff },
    { value: 'CharlieChoc', image: CharlieChoc },
    { value: 'CTHD', image: CTHD },
    { value: 'DevilWears', image: DevilWears },
    { value: 'ESOSM', image: ESOSM },
    { value: 'FightClub', image: FightClub },
    { value: 'HarryPotter', image: HarryPotter },
    { value: 'JamesBond', image: JamesBond },
    { value: 'KillBill', image: KillBill },
    { value: 'KKid', image: KKid },
    { value: 'LegallyBlonde', image: LegallyBlonde },
    { value: 'LOTR', image: LOTR },
    { value: 'LOTRGand', image: LOTRGand },
    { value: 'LOTRSar', image: LOTRSar },
    { value: 'LWAW', image: LWAW },
    { value: 'Matrix', image: Matrix },
    { value: 'MeanGirls', image: MeanGirls },
    { value: 'OneFlewOver', image: OneFlewOver },
    { value: 'PulpF', image: PulpF },
    { value: 'RememberT', image: RememberT },
    { value: 'ShawS', image: ShawS },
    { value: 'SpaceOd', image: SpaceOd },
    { value: 'StarWars', image: StarWars },
    { value: 'LOVforVenTR', image: VforVen },
    { value: 'WizOz', image: WizOz },
    { value: 'Zoolander', image: Zoolander }
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