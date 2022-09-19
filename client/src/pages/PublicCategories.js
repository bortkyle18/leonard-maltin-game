import { useState, useEffect } from "react"
import Container from "react-bootstrap/Container"
import BasicNav from "../components/BasicNav"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

const PublicCategories = (props) => {
  const [ publicData, setPublicData ] = useState(null)

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

  if (!publicData) {
    return (
      <p>Loading... Come on HAL!</p>
    )
  }

  return (
    <Container style={{ paddingTop: "1em" }}>
      <div>
        <BasicNav authUser={ props.authUser }/>
        <h3>{publicData.username}</h3>
        {publicData.categories.map((category) => {
          return (
            <Card key={category._id}>
              <Link to={`../../Category/${category.id}`}>
                <Card.Body className="text-center">
                    <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
      </div>
    </Container>
  )
}

export default PublicCategories