import { useState, useEffect } from "react";
import GameNav from '../components/GameNav';
import { Button, Card, Alert } from "react-bootstrap";
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
      await setProfileData(parsedResponse.payload)
      parsedResponse.payload.friends.map((friend) => {
        getFriendsData(friend.username)
      })
    }
  }
  useEffect(() => {
    getProfileData()
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
      <h1>Game Setup</h1>
      <h2>Choose categories you would like to include in this game.</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Public Categories</Accordion.Header>
          <Accordion.Body>
            {publicData.categories.map((category) => {
              return (
                <Card key={category._id}>
                  <Card.Body className="text-center">
                      <Card.Title>{category.title}</Card.Title>
                      <Card.Text>{category.description}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
        {auth.loggedIn() && profileData && (
          <Accordion.Item eventKey="1">
            <Accordion.Header>{profileData.username}'s Categories</Accordion.Header>
            <Accordion.Body>
              {profileData.categories.map((category) => {
                return (
                  <Card key={category._id}>
                    <Card.Body className="text-center">
                        <Card.Title>{category.title}</Card.Title>
                        <Card.Text>{category.description}</Card.Text>
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
                <Accordion.Body>
                  {friend.categories.map((category) => {
                    return (
                      <Card key={category._id}>
                        <Card.Body className="text-center">
                            <Card.Title>{category.title}</Card.Title>
                            <Card.Text>{category.description}</Card.Text>
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