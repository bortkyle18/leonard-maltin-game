import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Players from '../components/Players'
import ChooseCategories from "../components/ChooseCategories";

const GameStart = (props) => {
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
      <h1>
        Game Setup
        <div>
          <Button className="btn-block" variant="success" href="/Play"
            disabled={(players.length < 2 || gameCategories.length < 1)}> 
            Start Game
          </Button>
          <Button className="btn-block" variant="danger" href="/"> 
            Back to Home
          </Button>
        </div>
      </h1>
      <Players players={ players } setPlayers={ setPlayers } />
      <ChooseCategories gameCategories={ gameCategories } setGameCategories={ setGameCategories } />
    </>
  );
};

export default GameStart;