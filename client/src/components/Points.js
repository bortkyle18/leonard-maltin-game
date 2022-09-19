import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Score = (props) => {
  const [ gameCategories, setGameCategories ] = useState([])
  const [ players, setPlayers ] = useState([])
  const oldCategories = gameCategories.filter((category) => category.id !== props.categoryData.id)
  const currentCategory = gameCategories.filter((category) => category.id === props.categoryData.id)

  useEffect(() => {
    setGameCategories(JSON.parse(localStorage.getItem('gameCategories')));
  }, []);

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem('players')));
  }, []);

  const addToScore = async (playerToChange) => {
    setPlayers(prevPlayer => {
      const updatePlayer = prevPlayer.map(player => {
        if (player.player === playerToChange.player) {
          return {...player, score: playerToChange.score + 1};
        }
        return player;
      });
      localStorage.setItem('players', JSON.stringify(updatePlayer));
      return updatePlayer;
    })
    const updatedMovies = currentCategory[0].movies.filter((movieList) => movieList.id !== props.movieData)
    const updatedCategory = {...currentCategory[0], movies: updatedMovies}
    const updatedCategoryList = [...oldCategories, updatedCategory]
    localStorage.setItem('gameCategories', JSON.stringify(updatedCategoryList));
    window.location.assign("../../Play")
  };

  return (
    <>
      {players.map((player) => {
        return(
          <Card key={Math.random()}>
            <Card.Body>
              <Card.Title>{player.player}: {player.score}</Card.Title>
              <Button onClick={() => addToScore(player)}>Award Point</Button>
            </Card.Body>
          </Card>
        )
      })}
    </>
  );
};

export default Score;