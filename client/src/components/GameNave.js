import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const GameNav = (props) => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Play">Category Select</Nav.Link>
            <Nav.Link href="/Scoreboard">Adjust Scores</Nav.Link>
            <Nav.Link href="/HowToPlayGame">How To Play</Nav.Link>
            <Nav.Link href="/">Quit</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default GameNav;