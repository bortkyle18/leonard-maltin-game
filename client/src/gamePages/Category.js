import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import GameNav from "../components/GameNave";
import Score from "../components/score";

const Category = (props) => {
  const { categoryId: categoryParam } = useParams();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [gameCategories, setGameCategories] = useState([]);

  useEffect(() => {
    setGameCategories(JSON.parse(localStorage.getItem('gameCategories')));
  }, []);

  useEffect(() => {
    if (gameCategories.length > 0) {
      const currentCategoryData = gameCategories.filter((category) => category.id === categoryParam)
      setCurrentCategory(currentCategoryData[0])
    }
  }, [categoryParam, gameCategories, currentCategory])

  if (currentCategory.movies) {
    return (
      <>
        <GameNav/>
        <Score/>
        <Card>
            <Card.Body className="text-center">
              <Card.Title>{currentCategory.title}</Card.Title>
              <Card.Text>{currentCategory.description}</Card.Text>
              {currentCategory.movies.map((movie) => {
                return (
                  <Link to={`${movie.id}`} key={movie.id}>
                    <Card>
                      <Card.Body className="text-center">
                        <div>
                          <Card.Title>{movie.title}</Card.Title>
                          <p>{movie.year}</p>
                          <p>Actors: {movie.actorList.length}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                )
              })}
            </Card.Body>
        </Card>
      </>
    );
  }
};

export default Category;