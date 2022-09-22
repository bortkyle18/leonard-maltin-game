import BasicNav from "../components/BasicNav"
import { Button } from 'react-bootstrap';
import auth from "../utils/auth";

const Home = (props) => {

  return (
    <div>
      <BasicNav authUser={ props.authUser }/>
      <div className="flex-row justify-content-center">
          { auth.loggedIn() && props.authUser ? (
            <div className="welcome text-center">
              <h1>Welcome to the Leonard Maltin Game, { props.authUser.pname }!</h1>
            </div>
          ) : (
            <div className="welcome text-center">
              <h1>Welcome to the Leonard Maltin Game!</h1>
            </div>
          )}
        </div>

        <div className="flex-row justify-content-center">
          <Button
            className="btn-block"
            href="/GameSetup"
            id="success-btn"
            variant="none"
            >
              Start Game
          </Button>
        </div>
    </div>
  )
}

export default Home