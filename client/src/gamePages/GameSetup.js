import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Players from '../components/Players'
import SetupNav from '../components/SetupNav';
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
      <SetupNav/>
      <h1>
        Game Setup
        <Button className="btn-block" variant="success" href="/Play"> 
          Start
        </Button>
      </h1>
      <Players players={ players } setPlayers={ setPlayers } />
      <ChooseCategories gameCategories={ gameCategories } setGameCategories={ setGameCategories } />
    </>
  );
};

export default GameStart;