import { useState, useEffect } from "react"
import { useParams, Navigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import auth from "../utils/auth"

const User = (props) => {
  const user = props.authUser
  const { username: userParam } = useParams();
  const [ profileData, setProfileData ] = useState(null)

  const getProfileData = async() => {
    if (userParam === undefined) {
      const response = await fetch(`/api/user/${auth.getProfile().username}`);
      const parsedResponse = await response.json();
      if (parsedResponse && parsedResponse.result === "success") {
        setProfileData(parsedResponse.payload);
      }
    } else {
      const response = await fetch(`/api/user/${userParam}`);
      const parsedResponse = await response.json();
      if (parsedResponse && parsedResponse.result === "success") {
        setProfileData(parsedResponse.payload);
      }
    }
  }
  
  useEffect(() => {
    getProfileData()
  }, [])


  if (auth.loggedIn() === false) {
    return (
      <Container style={{ paddingTop: "1em" }}>
        <div>
          <h1>You must be logged in? INCONCEIVABLE!</h1>
          <p>The Princess Bride (1987)</p>
        </div>
      </Container>
    )
  }

  if (user) {
    // navigate to personal profile page if username is the logged-in user's
    if (auth.loggedIn() && auth.getProfile().username === userParam) {
      return <Navigate to="/profile" />;
    }

    return (
      <Container style={{ paddingTop: "1em" }}>
        { !profileData ? (
          <div>
            <h1>Profile not found? INCONCEIVABLE!</h1>
            <p>The Princess Bride (1987)</p>
          </div>
        ) : (
          <div>
            {profileData.username}
            {profileData.categories}
          </div>
        )}
      </Container>
    )
  }
}

export default User