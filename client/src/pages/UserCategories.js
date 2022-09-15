import { useState, useEffect } from "react"
import BasicNav from "../components/BasicNav"
import Container from "react-bootstrap/Container"
import auth from "../utils/auth"
import { Card } from "react-bootstrap"

const UserCategories = (props) => {
  const user = props.authUser
  const [ profileData, setProfileData ] = useState(null)

  const getProfileData = async() => {
    const response = await fetch(`/api/user/${auth.getProfile().username}`);
    const parsedResponse = await response.json();
    if (parsedResponse && parsedResponse.result === "success") {
      setProfileData(parsedResponse.payload);
    }
  }
  
  useEffect(() => {
    getProfileData()
  }, [])



  if (!auth.loggedIn()) {
    return (
      <Container style={{ paddingTop: "1em" }}>
        <BasicNav authUser={ props.authUser }/>
        <div>
          <h1>You must be logged in? INCONCEIVABLE!</h1>
          <p>The Princess Bride (1987)</p>
        </div>
      </Container>
    )
  }

  if (!user) {
    return (
      <>
        <BasicNav authUser={ props.authUser }/>
        <p>Loading... Come on HAL!</p>
      </>
    )
  }

  return (
    <Container style={{ paddingTop: "1em" }}>
      <BasicNav authUser={ props.authUser }/>
      { !profileData ? (
        <div>
          <h1>Profile not found? INCONCEIVABLE!</h1>
          <p>The Princess Bride (1987)</p>
        </div>
      ) : (
        <div>
          <h3>{profileData.username}</h3>
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
        </div>
      )}
    </Container>
  )
}

export default UserCategories