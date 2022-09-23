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
        <div className="justify-content-center text-center selectCategoryCard">
          <h2>{currentCategory.title}</h2>
          <h3>{currentCategory.description}</h3>
          <div className="flex-row justify-content-center">
            {currentCategory.movies.map((movie) => {
              return (
                <Link to={`${movie.id}`} key={movie.id} className="flex-block justify-content-center align-items-center movieCard">
                  <Card>
                    <Card.Header>
                      <h2>{movie.year}</h2>
                      <p>{movie.actorList.length} Actors Listed</p>
                      </Card.Header>
                    <Card.Body className="text-center">
                      <div>
                        <p>{movie.title}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Category;