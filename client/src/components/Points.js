import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Score = (props) => {
  const [ gameCategories, setGameCategories ] = useState([])
  const [ players, setPlayers ] = useState([])
  const oldCategories = gameCategories.filter((category) => category.id !== props.currentCategory.id)
  const currentCategory = gameCategories.filter((category) => category.id === props.currentCategory.id)

  console.log(props.categoryData)
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
    <div className="flex-row align-items-center justify-space-around">
      {players.map((player) => {
        return(
          <Card key={Math.random()} bg="dark">
            <Card.Body className="text-center playerCard">
              {players.length < 6 ? (
                <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImageAdded"/>
              ) : (
                <img src={player.playerImage.image} alt={player.playerImage.value} className="playerImage"/>
              )}
              <Card.Title>{player.player} - {player.score}</Card.Title>
              <Button id="success-btn" variant="none" onClick={() => addToScore(player)}>Award Point</Button>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  );
};

export default Score;