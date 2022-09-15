import { useState, useEffect } from "react"
import { useParams, Navigate } from "react-router-dom"
import Container from "react-bootstrap/Container"
import auth from "../utils/auth"
import { Card } from "react-bootstrap"

const PublicCategories = () => {
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
        <h3>{publicData.username}</h3>
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
      </div>
    </Container>
  )
}

export default PublicCategories