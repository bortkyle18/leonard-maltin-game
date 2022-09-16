import BasicNav from "../components/BasicNav"
import { Button } from 'react-bootstrap';
import auth from "../utils/auth";

const Home = (props) => {

  return (
    <div>
      <BasicNav authUser={ props.authUser }/>
      { auth.loggedIn() && props.authUser ? (
        <div>
          <h1>Welcome { props.authUser.pname }!</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome!</h1>
        </div>
      )}

        <Button
          className="btn-block"
          variant="success"
          href="/GameSetup"
        >
          Start Game
      </Button>
    </div>
  )
}

export default Home