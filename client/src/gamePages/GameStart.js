import { useState, useEffect } from "react";
import GameNav from '../components/GameNav';
import { Form, Button, Row, Card, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container"
import Accordion from 'react-bootstrap/Accordion';
import auth from "../utils/auth";
import ChooseCategories from "../components/ChooseCategories";

const GameStart = (props) => {
  const [ gameCategories, setGameCategories ] = useState(null)
  const [ players, setPlayers ] = useState(null)
  const [ scoreboard, setScoreboard ] = useState([])


  return (
    <>
      <GameNav/>
      <ChooseCategories/>
    </>
  );
};

export default GameStart;