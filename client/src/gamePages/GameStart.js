import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GameNav from '../components/GameNav';
import { Form, Button, Row, Card, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container"
import Accordion from 'react-bootstrap/Accordion';
import auth from "../utils/auth";
import ChooseCategories from "../components/ChooseCategories";

const GameStart = (props) => {
  const [ gameCategories, setGameCategories ] = useState([])
  const [ players, setPlayers ] = useState([])

  return (
    <>
      <GameNav/>
      <ChooseCategories gameCategories={ gameCategories } setGameCategories={ setGameCategories } />
    </>
  );
};

export default GameStart;