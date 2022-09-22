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
      <div className="flex-row justify-content-center">
      {// eslint-disable-next-line
      categories.map((category) => {
        if(category.movies.length > 0) {
          return (
            <Card className="cardStack">
              <Link to={`${category._id}`}  key={category._id}  className="categoryCard text-center">
                <Card.Header>{category.title} ({category.movies.length})</Card.Header>
                <Card.Body className="text-center">
                  <Card.Text>{category.description}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          )
        } else {
          setCategories(categories.filter((categoryList) => categoryList.id !== category._id))
        }
      })
      }
      </div>
      {categories.length === 0 && (
        <>
          <h1>Game Over</h1>
        </>
      )}
    </>
  );
};

export default Play;