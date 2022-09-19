import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import GameNav from "../components/GameNave";
import Score from "../components/score";

const Movie = (props) => {
  const { categoryId: categoryParam } = useParams();
  const { movieId: movieParam } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const getCategoryData = async (categoryParam) => {
    const response = await fetch(`/api/category/${categoryParam}`);
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
        <Score/>
        <Card>
            <Card.Body className="text-center">
              <Link to={`../Play/${categoryData._id}`}>
                <Card.Title>{categoryData.title}</Card.Title>
                <Card.Text>{categoryData.description}</Card.Text>
              </Link>
              {categoryData.movies.map((movie) => {
                return (
                  <div key={movie.id}>
                    {movie.id === movieParam &&(
                    <Card>
                      <Row lg={2}>
                        <Card.Body className="text-center">
                          {movie.image ? (
                            <Card.Img
                              src={movie.image}
                              alt={`The poster for ${movie.title}`}
                              variant="top"
                            />
                          ) : null}
                          </Card.Body>
                        <Card.Body className="text-center">
                          <Card.Title>{movie.title}</Card.Title>
                          <p>{movie.year}</p>
                          <p>{movie.runtimeStr}</p>
                          <p>Actors: {movie.actorList.length}</p>
                          <p>{movie.contentRating}</p>
                          <>{movie.directorList.length < 2 ? (
                            movie.directorList.map((director) => {
                              return (
                                <p key={director.id}>Director: {director.name}</p>
                              )})
                            ) : (<>Directors: {movie.directorList.map((director) => {
                              return (
                                <p key={director.id}>{director.name}</p>
                              )
                            })}</>)
                            }
                          </>
                          <>{movie.writerList.length < 2 ? (
                            movie.writerList.map((writer) => {
                              return (
                                <p key={writer.id}>Writer: {writer.name}</p>
                              )})
                            ) : (<>Writers: {movie.writerList.map((writer) => {
                              return (
                                <p key={writer.id}>{writer.name}</p>
                              )
                            })}</>)
                            }
                          </>
                          <p>IMDb Rating: {movie.imDbRating}</p>
                          <p>Metacritic Rating: {movie.metacriticRating}</p>
                          <>{movie.genreList.length < 2 ? (
                            movie.genreList.map((genre) => {
                              return (
                                <p key={genre.value}>Genre: {genre.value}</p>
                              )})
                            ) : (<>Genres: {movie.genreList.map((genre) => {
                              return (
                                <p key={genre.value}>{genre.value}</p>
                              )
                            })}</>)
                            }
                          </>
                          <>Description: <p>{movie.plot}</p></>
                          {movie.tagline !== null && (
                            <p>Tagline: {movie.tagline}</p>
                          )}
                        </Card.Body>
                      </Row>
                      <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Additional Info</Accordion.Header>
                          <Accordion.Body>
                            {movie.awards !== null && (
                              <p>Awards: {movie.awards}</p>
                            )}
                            <p>USA Opening Weekend: {movie.boxOffice.openingWeekendUSA}</p>
                            <p>USA Gross: {movie.boxOffice.grossUSA}</p>
                            <p>Globale Gross: {movie.boxOffice.cumulativeWorldwideGross}</p>
                            <>{movie.keywordList.length < 2 ? (
                              movie.keywordList.map((keyword) => {
                                return (
                                  <p key={keyword}>Keyword: {keyword}</p>
                                )})
                              ) : (<>Keywords: {movie.keywordList.map((keyword) => {
                                return (
                                  <p key={keyword}>{keyword}</p>
                                )
                              })}</>)
                              }
                            </>
                            <>{movie.similars.length < 2 ? (
                              movie.similars.map((movie) => {
                                return (
                                  <p key={movie.id}>Movie: {movie.title}</p>
                                )})
                              ) : (<>Movies: {movie.similars.map((movie) => {
                                return (
                                  <p key={movie.id}>{movie.title}</p>
                                )
                              })}</>)
                              }
                            </>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Actor List</Accordion.Header>
                          <Accordion.Body className="actorScroll">
                            <div className="actorList">
                              {movie.actorList.map((actor) => {
                                return (
                                  <Card className="actorCard" key={actor.id}>
                                    <Card.Body>
                                      {actor.image ? (
                                        <Card.Img
                                          className="actorImage"
                                          src={actor.image}
                                          alt={`${actor.name}`}
                                        />
                                      ) : null}
                                    </Card.Body>
                                    <Card.Title>
                                      {12 - movie.actorList.indexOf(actor)}. {actor.name}
                                    </Card.Title>
                                  </Card>
                                )
                              })}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </Card>
                    )}
                  </div>
                )
              })}
            </Card.Body>
        </Card>
      </>
    );
  }
};

export default Movie;