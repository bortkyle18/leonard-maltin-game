import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Auth from "../../utils/auth"

const BasicNav = (props) => {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/HowToPlay">How To Play</Nav.Link>
            {/* if user is... */}
            {Auth.loggedIn() ? (
              // logged in show
              <>
                <Nav.Link href='/Profile'>My Profile</Nav.Link>
                <Nav.Link href="/PublicCategories">Public Categories</Nav.Link>
                <Nav.Link href='/MyCategories'>My Categories</Nav.Link>
                <Nav.Link href='/CreateCategory'>Create a Category</Nav.Link>
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>) : (
                // not logged in show
                <>
                  <Nav.Link href="/PublicCategories">Public Categories</Nav.Link>
                  <Nav.Link href="/Login">Login</Nav.Link>
                  <Nav.Link href="/SignUp">Sign Up</Nav.Link>
                </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default BasicNav;
