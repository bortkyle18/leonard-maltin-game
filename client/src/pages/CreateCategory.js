import { useState } from "react"
import { Form, Button, Row, Card, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container"
import auth from "../utils/auth"


const CreateCategory = (props) => {
  const userId = auth.getProfile()._id
  // Category Name
  const [categoryInput, setCategoryInput] = useState("");
  // Category Description
  const [descriptionInput, setDescriptionInput] = useState("");
  // Movie Search field to use with IMDb API fetch
  const [movieSearchInput, setMovieSearchInput] = useState("");
  // Movie returned from IMDb API fetch
  const [moviesFound, setMoviesFound] = useState([]);
  // All movies saved to category
  const [savedMovies, setSavedMovies] = useState([]);
  // Let user know if the category was saved or not
  const [saveMessage, setSaveMessage] = useState({ type: "", msg: "" });


  const handleMovieSearchSubmit = async (event) => {
    event.preventDefault();

    // Don't allow blank input search
    if (!movieSearchInput) {
      return false;
    }

    try {
      // Call to IMDb API for movie options and data based on search input
      const response = await fetch(
        `https://imdb-api.com/en/API/Search/k_3fj95i3b/${movieSearchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { results } = await response.json();

      // Set data returned by IMDb API call for each movie
      const movieData = results.map((movie) => ({
        id: movie.id,
        poster: movie.image,
        title: movie.title,
        year: movie.description
      }))

      setMoviesFound(movieData);
      setMovieSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovieToCategory = async (movie) => {
    try {
      const response = await fetch(
        `https://imdb-api.com/en/API/Title/k_3fj95i3b/${movie.id}/Posters,Images,Trailer,Ratings`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const movieDataToSave = await response.json();
      console.log(movieDataToSave)
      setSavedMovies([...savedMovies, movieDataToSave]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovieFromCategory = async (event) => {
  
  }

  const handleSaveCategory = async (event) => {
    event.preventDefault();

    const CategoryInfoToSave = {
      title: categoryInput,
      description: descriptionInput,
      userId: userId,
      movies: savedMovies
    };

    setSaveMessage({ type: "", msg: "" });
    const saveCategory = await fetch(`api/category/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CategoryInfoToSave),
    });
    const saveCategoryResult = await saveCategory.json();

    if (saveCategoryResult.result === "success") {
      setSaveMessage({
        type: "success",
        msg: "Fun Success Quote Here"
      });
    } else {
      setSaveMessage({
        type: "danger",
        msg: "We were unable to save this category to your profile"
      });
    }
  }

  if (props.authUser) {
    return (
      <>
      <Form onSubmit={handleSaveCategory} className="text-center">
          <Form.Control
            name="categoryInput"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Category Name (puns are encouraged)"
          />

          <Form.Control
            name="descriptionInput"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Category Description"
          />

        <Container>
          <p>
              {savedMovies.length ? `You have ${savedMovies.length} movie(s) in: ${categoryInput}`: ""}
            </p>
            <Row xs={3} md={6} >
              {savedMovies.map((movie) => {
                return (
                  <Card key={movie.id}>
                    <Card.Body className="text-center" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <div>
                        <Card.Title>{movie.title}</Card.Title>
                        {movie.image ? (
                          <Card.Img
                            src={movie.image}
                            alt={`The poster for ${movie.title}`}
                            variant="top"
                          />
                        ) : null}
                        <p>{movie.year}</p>
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn-block"
                          onClick={() => handleDeleteMovieFromCategory(movie)}
                        >
                          Delete from Category
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </Row>
          </Container>
          {categoryInput.length > 0 && descriptionInput.length > 0 && savedMovies.length > 0 && (
          <Button type="submit" variant="danger" size="lg">
            Save Category
          </Button>
          )}
          {saveMessage.msg.length > 0 && (
            <Alert
              variant={saveMessage.type}
              style={{ marginTop: "2em" }}
            >
              {saveMessage.msg}
            </Alert>
          )}
        </Form>

        <Form onSubmit={handleMovieSearchSubmit}>
          <p>Search and Add Movies to Category</p>
          <Form.Control
            name="movieSearchInput"
            value={movieSearchInput}
            onChange={(e) => setMovieSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for a movie"
          />

          <Button type="submit" variant="danger" size="lg">
            Submit Search
          </Button>
        </Form>


        <Container>
          <p>
            {moviesFound.length ? `Viewing ${moviesFound.length} results:`: ""}
          </p>
          <Row xs={3} md={6} >
            {moviesFound.map((movie) => {
              return (
                <Card key={movie.id}>
                  <Card.Body className="text-center" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <Card.Title>{movie.title}</Card.Title>
                      {movie.poster ? (
                        <Card.Img
                          src={movie.poster}
                          alt={`The poster for ${movie.title}`}
                          variant="top"
                        />
                      ) : null}
                      <p>{movie.year.replace("(", "").replace(")", "")}</p>
                    </div>
                    <div className="text-center">
                      <Button
                        className="btn-block"
                        variant="danger"
                        onClick={() => handleSaveMovieToCategory(movie)}
                      >
                        Save to Category
                      </Button>
                      {/* {saveMessage.msg.length > 0 && (
                        <Alert
                          variant={saveMessage.type}
                          style={{ marginTop: "2em" }}
                        >
                          {saveMessage.msg}
                        </Alert>
                      )} */}
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        </Container>
      </>
    )
  }
}

export default CreateCategory