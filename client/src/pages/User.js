import { useState, useEffect } from "react"
import { useParams, Navigate, Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import BasicNav from "../components/BasicNav"
import auth from "../utils/auth"
import { Card, Button, Alert } from "react-bootstrap"
import Friends from "../components/Friends"

const User = (props) => {
  const user = props.authUser
  const { username: userParam } = useParams();
  const [ profileData, setProfileData ] = useState(null)
  const [deleteMessage, setDeleteMessage] = useState({ type: "", msg: "" });

  const getProfileData = async(userParam) => {
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
    getProfileData(userParam)
  }, [userParam])

  const handleCategoryDelete = async (categoryId) => {
    const deleteCategory = await fetch(`../api/category/${categoryId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const deleteCategoryResult = await deleteCategory.json();

    if (deleteCategoryResult.result !== "success") {
      setDeleteMessage({
        type: "danger",
        msg: "We were unable to delete this category from your profile"
      });
    }
    window.location.reload()
  }

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
  
  // navigate to personal profile page if username is the logged-in user's
  if (auth.loggedIn() && auth.getProfile().username === userParam) {
    return <Navigate to="/profile" />;
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
          {deleteMessage.msg.length > 0 && (
            <Alert
              variant={deleteMessage.type}
              style={{ marginTop: "2em" }}
            >
              {deleteMessage.msg}
            </Alert>
          )}
          {profileData.categories.map((category) => {
            return (
              <Card key={category._id}>
                <Link to={`../../Category/${category.id}`}>
                  <Card.Body className="text-center">
                      <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                      <Card.Text>{category.description}</Card.Text>
                  </Card.Body>
                </Link>
                {auth.getProfile().username === profileData.username && (
                  <>
                    <Button
                      className="btn-block"
                      variant="warning"
                      href={`/EditCategory/${category._id}`}
                      >
                        Edit Category
                    </Button>
                    <Button
                      className="btn-block"
                      variant="danger"
                      onClick={() => handleCategoryDelete(category._id)}
                      >
                        Delete Category
                    </Button>
                  </>
                )}
              </Card>
            );
          })}
          <Card>
            <Friends user={profileData}/>
          </Card>
        </div>
      )}
    </Container>
  )
}

export default User