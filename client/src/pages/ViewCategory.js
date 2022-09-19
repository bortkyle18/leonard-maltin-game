import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import BasicNav from "../components/BasicNav";

const ViewCategory = (props) => {
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

  if (categoryData.movies) {
    return (
      <>
        <BasicNav authUser={ props.authUser }/>
        <Card>
          <Card.Body className="text-center">
            <Card.Title>{categoryData.title}</Card.Title>
            <Card.Text>{categoryData.description}</Card.Text>
            {categoryData.movies.map((movie) => {
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

export default ViewCategory;