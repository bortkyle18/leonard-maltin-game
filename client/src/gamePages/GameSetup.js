import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Players from '../components/Players'
import ChooseCategories from "../components/ChooseCategories";

const GameStart = (props) => {
  const [playerSelect, setPlayerSelect] = useState(true);
  const [ gameCategories, setGameCategories ] = useState([])
  const [ players, setPlayers ] = useState([])

  useEffect(() => {
    localStorage.setItem('gameCategories', JSON.stringify(gameCategories));
  }, [gameCategories]);

  useEffect(() => {
    setGameCategories(JSON.parse(localStorage.getItem('gameCategories')));
  }, []);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('players')));
  }, []);

  return (
    <>
      <div className="startGameButton">
        <Button className="btn-block" id="success-btn" variant="none" size="lg" href="/Play"
          disabled={(players.length < 2 || gameCategories.length < 1)}> 
          Start Game
        </Button>
      </div>
      <div className="setUpTitle">
        Game Setup
      </div>
      {playerSelect ? (
        <Players players={ players } setPlayers={ setPlayers } /> 
      ) : (
      <ChooseCategories gameCategories={ gameCategories } setGameCategories={ setGameCategories } />
      )}
      <div className="flex-row align-items-center justify-space-between gameSetUpButton">
        <div>
          <Button className="btn-block" size="lg" variant="danger" href="/"> 
            Back to Home
          </Button>
        </div>
        <div>
          {playerSelect ? (
            <Button id="success-btn" variant="none" size="lg" onClick={() => setPlayerSelect(false)}>
              Choose Categories
            </Button> 
            ) : (
            <Button id="success-btn" variant="none" size="lg" onClick={() => setPlayerSelect(true)}>
              Add/Remove Players
            </Button> 
          )}
        </div>
      </div>
    </>
  );
};

export default GameStart;