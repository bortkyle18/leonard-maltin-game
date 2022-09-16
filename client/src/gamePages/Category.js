import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Link } from "react-bootstrap";
import GameNav from "../components/GameNave";

const Category = (props) => {
  const { categoryId: categoryParam } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const getCategoryData = async (categoryParam) => {
    const response = await fetch(`../api/category/${categoryParam}`);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setCategoryData(parsedResponse.payload);
    }
  };

  useEffect(() => {
    getCategoryData(categoryParam);
  }, [categoryParam]);

  console.log(categoryData.movies)

  if (categoryData.movies) {
    return (
      <>
        <GameNav/>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>{categoryData.title}</Card.Title>
            <Card.Text>{categoryData.description}</Card.Text>
            {categoryData.movies.map((movie) => {
              return (<Card key={movie.id}>
                <Card.Body className="text-center">
                  <div>
                    <Card.Title>{movie.title}</Card.Title>
                    <p>{movie.year}</p>
                    <p>Actors: {movie.actorList.length}</p>
                  </div>
                </Card.Body>
              </Card>
              )
            })}
          </Card.Body>
        </Card>
      </>
    );
  }
};

export default Category;