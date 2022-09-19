import { useEffect, useState } from "react";
import { Card} from "react-bootstrap";
import GameNav from "../components/GameNave";
import { Link } from "react-router-dom";
import Score from "../components/score";

const Play = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem('gameCategories')));
  }, []);

  return (
    <>
      <GameNav/>
      <Score/>
      {// eslint-disable-next-line
      categories.map((category) => {
        if(category.movies.length > 0) {
          return (
            <Link to={`${category._id}`}  key={category._id}>
              <Card>
                <Card.Body className="text-center">
                  <Card.Title>{category.title} ({category.movies.length})</Card.Title>
                  <Card.Text>{category.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          )
        } else {
          setCategories(categories.filter((categoryList) => categoryList.id !== category._id))
        }
      })
      }
      {categories.length === 0 && (
        <>
          <h1>Game Over</h1>
        </>
      )}
    </>
  );
};

export default Play;