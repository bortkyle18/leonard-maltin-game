import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import GameNav from "../components/GameNave";
import Points from "../components/Points"

const Movie = (props) => {
  const { categoryId: categoryParam } = useParams();
  const { movieId: movieParam } = useParams();
  const [currentCategory, setCurrentCategory] = useState([]);
  const [gameCategories, setGameCategories] = useState([]);

  useEffect(() => {
    setGameCategories(JSON.parse(localStorage.getItem('gameCategories')));
  }, []);

  useEffect(() => {
    if (gameCategories.length > 0) {
      const currentcurrentCategory = gameCategories.filter((category) => category.id === categoryParam)
      setCurrentCategory(currentcurrentCategory[0])
    }
  }, [categoryParam, gameCategories, currentCategory])

  if (currentCategory.movies) {
    console.log(currentCategory.movies)
    return (
      <>
        <GameNav/>
        <Points movieData={movieParam} currentCategory={currentCategory}/>
        <div className="movieInfo">
          <Card.Body>
            <Link to={`../Play/${currentCategory._id}`} className="text-center movieCardHeader">
              <Card.Header>{currentCategory.title}</Card.Header>
              <h4>{currentCategory.description}</h4>
            </Link>
            {currentCategory.movies.map((movie) => {
              console.log(movie)
              return (
                <div key={movie.id}>
                  {movie.id === movieParam &&(
                  <>
                  <Card.Header>
                    <div className="movieTitle">
                      <h1>{movie.title}</h1>
                      <div className="flex-row">
                        {movie.imDbRating > 7.5 ? (
                          <p>IMDb: <span className="goodMovie">{movie.imDbRating}</span></p>
                        ) : (movie.imDbRating > 4.5? (
                          <p>IMDb: <span className="okayMovie">{movie.imDbRating}</span></p>
                        ): (
                          <p>IMDb: <span className="badMovie">{movie.imDbRating}</span></p>
                        ))}
                        {movie.metacriticRating != null && movie.metacriticRating > 75 ? (
                          <p>Metacritic: <span className="goodMovie">{movie.metacriticRating}</span></p>
                        ) : (movie.metacriticRating != null && movie.metacriticRating > 45 ? (
                          <p>Metacritic: <span className="okayMovie">{movie.metacriticRating}</span></p>
                        ): (movie.metacriticRating != null && (
                          <p>Metacritic: <span className="badMovie">{movie.metacriticRating}</span></p>
                        )))}
                      </div>
                    </div>
                    <div className="movieYear">
                      <h4>{movie.year}</h4>
                      <h4>{movie.actorList.length} Actors Listed</h4>
                      <h4>{movie.contentRating}</h4>
                      <h4>{movie.runtimeStr}</h4>
                    </div>
                  </Card.Header>
                  <div className="flex-row justify-content-center movieInfoCard">
                    <div className="col-4">
                      <Card.Body className="text-center">
                        {movie.image ? (
                          <Card.Img
                            src={movie.image}
                            alt={`The poster for ${movie.title}`}
                            variant="top"
                          />
                        ) : null}
                      </Card.Body>
                    </div>
                    <div className="col-8">
                      <Card.Body>
                        <div className="genreCard">
                          {movie.genreList.map((genre) => {
                            return (
                              <p key={genre.value} className="movieGenre">{genre.value}</p>
                            )
                          })}
                        </div>
                        <div className="flex-row">
                          {movie.directorList.length < 2 ? (
                            movie.directorList.map((director) => {
                              return (
                                <div className="flex-row movieWriter">
                                  <p key={director.id}>Director:</p>
                                  <p>{director.name}</p>
                                </div>
                              )})
                            ) : (<div className="flex-row movieWriter">
                              <p>Directors:</p> {movie.directorList.map((director) => {
                              return (
                                <p key={director.id}>{director.name}</p>
                              )
                            })}</div>)
                          }
                        </div>
                        <div className="flex-row movieWriter">
                          <p>Written By:</p> {movie.writerList.map((writer) => {
                            return (
                              <p key={writer.id}>{writer.name}</p>
                            )
                          })}
                        </div>
                        <div className="movieDescription">
                          <p>Description:</p>
                          <p>{movie.plot}</p>
                        </div>
                        {movie.tagline !== null && (
                          <p>Tagline: {movie.tagline}</p>
                        )}
                        <Accordion alwaysOpen className="movieInfoCard">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Reviews</Accordion.Header>
                            <Accordion.Body className="reviewScroll">
                              <div className="flex-row justify-content-center">
                                {movie.reviews.map((review) => {
                                  return (
                                    <div className="reviewCard" key={review.publisher}>
                                      <h2 className="text-center">
                                        {review.publisher}
                                      </h2>
                                      <div className="flex-row justify-content-center">
                                      {review.rate != null && review.rate  > 75 ? (
                                        <p className="goodMovie">{review.rate }</p>
                                      ) : (review.rate  != null && review.rate  > 45 ? (
                                        <p className="okayMovie">{review.rate }</p>
                                      ): (review.rate  != null && (
                                        <p className="badMovie">{review.rate }</p>
                                      )))}
                                      </div>
                                      <p>
                                        {review.content}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <Accordion alwaysOpen className="movieInfoCard">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Additional Info</Accordion.Header>
                            <Accordion.Body className="additionalInfoScroll flex-row justify-content-center">
                              {movie.awards !== null && (
                                <p className="additionalInfoCard">{movie.awards}</p>
                              )}
                              <p className="additionalInfoCard">U.S. Opening Weekend: {movie.boxOffice.openingWeekendUSA}</p>
                              <p className="additionalInfoCard">U.S. Gross: {movie.boxOffice.grossUSA}</p>
                              <p className="additionalInfoCard">Globale Gross: {movie.boxOffice.cumulativeWorldwideGross}</p>
                              <div className="additionalInfoCard">{movie.keywordList.length < 2 ? (
                                movie.keywordList.map((keyword) => {
                                  return (
                                    <p key={keyword} className="additionalInfoList">Keyword: {keyword}</p>
                                  )})
                                ) : (<>Keywords: {movie.keywordList.map((keyword) => {
                                  return (
                                    <p key={keyword} className="additionalInfoList">{keyword}</p>
                                  )
                                })}</>)
                                }
                              </div>
                              <div className="additionalInfoCard">{movie.similars.length < 2 ? (
                                movie.similars.map((movie) => {
                                  return (
                                    <p key={movie.id} className="additionalInfoList">Similar Movie: {movie.title}</p>
                                  )})
                                ) : (<>Similar Movies: {movie.similars.map((movie) => {
                                  return (
                                    <p key={movie.id} className="additionalInfoList">{movie.title}</p>
                                  )
                                })}</>)
                                }
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Card.Body>
                    </div>
                  </div>
                  <Accordion alwaysOpen className="movieInfoCard">
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
                  </>
                  )}
                </div>
              )
            })}
          </Card.Body>
        </div>
      </>
    );
  }
};

export default Movie;