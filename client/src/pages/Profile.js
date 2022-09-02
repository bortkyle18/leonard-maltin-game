import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"

const User = (props) => {
  // id is the name of the wildcard variable we specified in the route in App.js
  const { id } = useParams()

  const [ user, setUser ] = useState(null)

  const fetchUser = async () => {
    const lookupQuery = await fetch(`/api/user/${id}`)
    const parsedResponse = await lookupQuery.json()
    if( parsedResponse.result === "success" ){
      setUser(parsedResponse.payload)
    }
  }

  useEffect( () => {
    fetchUser()
  }, [])

  return (
    <Container style={{ paddingTop: "1em" }}>
      { !user ? (
        <div>
          <h1>Profile not found? INCONCEIVABLE!</h1>
          <p>The Princess Bride (1987)</p>
        </div>
      ) : (
        <div>
          {/* user info to display - user homepage */}
        </div>
      )}
    </Container>
  )
}

export default User