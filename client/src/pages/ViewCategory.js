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
        <div className="justify-content-center text-center selectCategoryCard">
          <h2>{categoryData.title}</h2>
          <h3>{categoryData.description}</h3>
          <div className="flex-row justify-content-center">
            {categoryData.movies.map((movie) => {
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

export default ViewCategory;