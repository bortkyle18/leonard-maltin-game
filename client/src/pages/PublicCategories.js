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
      <p>Loading... Open the pod bay doors, please, HAL.</p>
    )
  }

  return (
    <Container>
      <BasicNav authUser={ props.authUser }/>
      <div className="flex-row justify-content-center">
        <h1 className="welcome">{publicData.username}</h1>
      </div>
      <div className="flex-row justify-content-center">
        {publicData.categories.map((category) => {
          return (
            <Card key={category._id} className="cardStack flex-row">
              <Link to={`../../Category/${category.id}`} className="categoryCard text-center">
                <Card.Header>{category.title} ({category.movies.length})</Card.Header>
                <Card.Body>
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