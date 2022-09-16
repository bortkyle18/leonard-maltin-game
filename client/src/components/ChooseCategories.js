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
      <p>Loading... Come on HAL!</p>
    )
  }

  if (auth.loggedIn() && !profileData) {
    return (
      <>
        <p>Loading... Come on HAL!</p>
      </>
    )
  }

  if (auth.loggedIn() && profileData.friends.length > 0 && !friendsData) {
    return (
      <>
        <p>Loading... Come on HAL!</p>
      </>
    )
  }

  return (
    <>
      <h2>Choose categories you would like to include in this game.</h2>
      {props.gameCategories.length === 1 ? (
        <h3>You have {props.gameCategories.length} category selected for this game.</h3>
      ) : (
        <h3>You have {props.gameCategories.length} categories selected for this game.</h3>
      )}
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Public Categories</Accordion.Header>
          <Accordion.Body className="divScroll">
            {publicData.categories.map((category) => {
              return (
                <Card key={category._id}>
                  <Card.Body className="text-center">
                    <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                    {props.gameCategories.filter((categories) => categories._id === category._id) < 1 ? (
                      <Button
                        className="btn-block"
                        variant="success"
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
          </Accordion.Body>
        </Accordion.Item>
        {auth.loggedIn() && profileData && (
          <Accordion.Item eventKey="1">
            <Accordion.Header>{profileData.username}'s Categories</Accordion.Header>
            <Accordion.Body className="divScroll">
              {profileData.categories.map((category) => {
                return (
                  <Card key={category._id}>
                    <Card.Body className="text-center">
                      <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                      <Card.Text>{category.description}</Card.Text>
                      {props.gameCategories.filter((categories) => categories._id === category._id) < 1 ? (
                        <Button
                          className="btn-block"
                          variant="success"
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
            </Accordion.Body>
          </Accordion.Item>
        )}
        {auth.loggedIn() && friendsData.length > 0 && (
          friendsData.map((friend) => {
            return (
              <Accordion.Item eventKey={friend._id} key={friend._id}>
                <Accordion.Header>{friend.username}'s Categories</Accordion.Header>
                <Accordion.Body className="divScroll">
                  {friend.categories.map((category) => {
                    return (
                      <Card key={category._id}>
                        <Card.Body className="text-center">
                          <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                          <Card.Text>{category.description}</Card.Text>
                          {props.gameCategories.filter((categories) => categories._id === category._id) < 1 ? (
                            <Button
                              className="btn-block"
                              variant="success"
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
                </Accordion.Body>
              </Accordion.Item>
            )}
          )
        )}
      </Accordion>
    </>
  );
};

export default ChooseCategories;