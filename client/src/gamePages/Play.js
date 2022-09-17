import { Card} from "react-bootstrap";
import GameNav from "../components/GameNave";
import { Link } from "react-router-dom";
import Score from "../components/score";

const Play = (props) => {
    const categories = JSON.parse(localStorage.getItem('gameCategories'));

  return (
    <>
      <GameNav/>
      <Score/>
      {categories.map((category) => {
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
      })}
    </>
  );
};

export default Play;