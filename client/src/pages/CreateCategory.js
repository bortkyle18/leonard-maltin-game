import { useState } from "react"
import { Form, Button, Row, Card, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container"
import BasicNav from "../components/BasicNav";
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
  // Let user know if the search data is loading
  const [loadingMessage, setLoadingMessage] = useState("");

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

  const handleMovieSearchSubmit = async (event) => {
    event.preventDefault();
    setMoviesFound([])
    setSaveMessage({type: "", msg: ""})

    setLoadingMessage("Loading... Come on Hal!")

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

      const findMovies = async (data) => {
        data.map( async (foundMovie) => {
          const dataResponse = await fetch(
            `https://imdb-api.com/en/API/Title/k_3fj95i3b/${foundMovie.id}/Posters,Images,Trailer,Ratings`
          );

          if (!dataResponse.ok) {
            throw new Error("something went wrong!");
          }

          const movieData = await dataResponse.json();
          const movieDataFound = {...movieData, actorList: (movieData.actorList.slice(0,12).reverse())};

          if (movieDataFound.type === "Movie") {
            setMoviesFound(moviesFound => [...moviesFound, movieDataFound])
          }
        })
      }

      findMovies(results)
      setMovieSearchInput("");
    } catch (err) {
      console.error(err);
    }
    setLoadingMessage("")
  };

  const handleSaveMovieToCategory = async (movie) => {
    setSavedMovies([...savedMovies, movie]);

    setMoviesFound([])
  };

  const handleDeleteMovieFromCategory = async (movie) => {
    setSavedMovies(savedMovies.filter((movieList) => movieList.id !== movie.id))
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

    setCategoryInput("")
    setDescriptionInput("")
    setSavedMovies([])
    setMovieSearchInput("")
    setMoviesFound([])
  }

  if (props.authUser) {
    return (
      <>
        <BasicNav authUser={ props.authUser }/>
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
              {savedMovies.length < 2 ? `You have ${savedMovies.length} movie in: ${categoryInput}`: `You have ${savedMovies.length} movies in: ${categoryInput}`}
            </p>
            <Row xs={3} md={5} >
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
                          variant="danger"
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
          <Button type="submit" variant="success" size="lg">
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
          <p>Search and Add Movies to Your Category</p>
          <Form.Control
            name="movieSearchInput"
            value={movieSearchInput}
            onChange={(e) => setMovieSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for a movie"
            required
          />

          <Button type="submit" variant="success" size="lg"
            disabled={!movieSearchInput}>
            Submit Search
          </Button>
        </Form>

        

        <Container>
          {loadingMessage.length > 0 && (
            <p>
              {loadingMessage}
            </p>
          )}
          <Row xs={3} md={4} >
            {moviesFound.map((movie) => {
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