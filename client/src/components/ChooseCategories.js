import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import auth from "../utils/auth";


const ChooseCategories = (props) => {
  const [ profileData, setProfileData ] = useState(null)
  const [ publicData, setPublicData ] = useState(null)
  const [ friendsData, setFriendsData ] = useState([])

  const getPublicData = async() => {
    const response = await fetch(`/api/user/PublicCategories`);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setPublicData(parsedResponse.payload);
    }
  }
  useEffect(() => {
    getPublicData()
  }, [])

  const getProfileData = async() => {
    const response = await fetch(`/api/user/${auth.getProfile().username}`);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setProfileData(parsedResponse.payload)
      // eslint-disable-next-line
      parsedResponse.payload.friends.map((friend) => {
        getFriendsData(friend.username)
      })
    }
  }
  useEffect(() => {
    getProfileData()
    // eslint-disable-next-line
  }, [])
  
  const getFriendsData = async(friend) => {
    const response = await fetch(`/api/user/${friend}`);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setFriendsData([...friendsData, parsedResponse.payload]);
    }
  }


  if (!publicData) {
    return (
      <p>Loading... Open the pod bay doors, please, HAL.</p>
    )
  }

  if (auth.loggedIn() && !profileData) {
    return (
      <>
        <p>Loading... Open the pod bay doors, please, HAL.</p>
      </>
    )
  }

  if (auth.loggedIn() && profileData.friends.length > 0 && !friendsData) {
    return (
      <>
        <p>Loading... Open the pod bay doors, please, HAL.</p>
      </>
    )
  }

  return (
    <div className="setUpSelect">
      <h2>Choose Categories</h2>
      {props.gameCategories.length === 1 ? (
        <p>You have {props.gameCategories.length} category selected for this game.</p>
      ) : (
        <p>You have {props.gameCategories.length} categories selected for this game.</p>
      )}

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Public Categories</Accordion.Header>
          <Accordion.Body className="divScroll">
          <div className="flex-row align-items-center justify-space-around text-center">
            {publicData.categories.map((category) => {
              return (
                <Card key={category._id} className="cardStack">
                  <Card.Body className="categoryCard text-center">
                    <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                    {props.gameCategories.filter((categories) => categories._id === category._id) < 1 ? (
                      <Button
                        className="btn-block"
                        id="success-btn"
                        variant="none"
                        onClick={ () => props.setGameCategories([...props.gameCategories, category])}
                      >
                        Add Category
                      </Button> 
                      ): <Button
                        className="btn-block"
                        variant="danger"
                        onClick={ () => props.setGameCategories(props.gameCategories.filter((categories) => categories._id !== category._id))}
                      >
                        Remove Category
                      </Button>
                    }
                  </Card.Body>
                </Card>
              );
            })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {auth.loggedIn() && profileData && (
          <Accordion.Item eventKey="1">
            <Accordion.Header>{profileData.username}'s Categories</Accordion.Header>
            <Accordion.Body className="divScroll">
            <div className="flex-row align-items-center justify-space-around text-center">
              {profileData.categories.map((category) => {
                return (
                  <Card key={category._id} className="cardStack">
                    <Card.Body className="categoryCard text-center">
                      <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                      <Card.Text>{category.description}</Card.Text>
                      {props.gameCategories.filter((categories) => categories._id === category._id) < 1 ? (
                        <Button
                          className="btn-block"
                          id="success-btn"
                          variant="none"
                          onClick={ () => props.setGameCategories([...props.gameCategories, category])}
                        >
                          Add Category
                        </Button> 
                        ): <Button
                          className="btn-block"
                          variant="danger"
                          onClick={ () => props.setGameCategories(props.gameCategories.filter((categories) => categories._id !== category._id))}
                        >
                          Remove Category
                        </Button>
                      }
                    </Card.Body>
                  </Card>
                );
              })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        )}
        {auth.loggedIn() && friendsData.length > 0 && (
          friendsData.map((friend) => {
            return (
              <Accordion.Item eventKey={friend._id} key={friend._id}>
                <Accordion.Header>{friend.username}'s Categories</Accordion.Header>
                <Accordion.Body className="divScroll">
                <div className="flex-row align-items-center justify-space-around text-center">
                  {friend.categories.map((category) => {
                    return (
                      <Card key={category._id} className="cardStack">
                        <Card.Body className="categoryCard text-center">
                          <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                          <Card.Text>{category.description}</Card.Text>
                          {props.gameCategories.filter((categories) => categories._id === category._id) < 1 ? (
                            <Button
                              className="btn-block"
                              id="success-btn"
                              variant="none"
                              onClick={ () => props.setGameCategories([...props.gameCategories, category])}
                            >
                              Add Category
                            </Button> 
                            ): <Button
                              className="btn-block"
                              variant="danger"
                              onClick={ () => props.setGameCategories(props.gameCategories.filter((categories) => categories._id !== category._id))}
                            >
                              Remove Category
                            </Button>
                          }
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
                </Accordion.Body>
              </Accordion.Item>
            )}
          )
        )}
      </Accordion>
      <br/>
      {/* <div className="flex-row align-items-center justify-space-around text-center">
        {
          props.gameCategories.map((category) => {
          return (
            <Card key={Math.random()} className="cardStack">
              <div className="categoryCard text-center">
                <Card.Header>{category.title} ({category.movies.length})</Card.Header>
                <Card.Body>
                  <Card.Text>{category.description}</Card.Text>
                  <Button
                    className="btn-block"
                    variant="danger"
                    onClick={ () => props.setGameCategories(props.gameCategories.filter((categories) => categories._id !== category._id))}
                  >
                    Remove Category
                  </Button>
                </Card.Body>
              </div>
            </Card>
          )
        })}
      </div> */}
    </div>
  );
};

export default ChooseCategories;