import { useState } from "react"
import Cookie from "js-cookie"
import { Alert, Button, Container, Form } from 'react-bootstrap'
import BasicNav from "../components/BasicNav"
import Auth from "../utils/auth"


const Login = (props) => {
  const [ loginCreds, setLoginCreds ] = useState({ email: "", password: "" })
  const [ formMessage, setFormMessage ] = useState({ type: "", msg: "" })

  const handleLogin = async (e) => {
    e.preventDefault()
    setFormMessage({ type: "", msg: "" })
    const authCheck = await fetch("/api/user/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCreds)
    })
    const authResult = await authCheck.json()

    // If the login was good, save the returned token as a cookie
    if( authResult.result !== "success" ){
      setFormMessage({ type: "danger", msg: "Login Failed. You shall not pass! - Lord of the Rings: The Fellowship of the Ring (2002)" })
    } else {
      Auth.login(authResult.token);
      Cookie.set("auth-token", authResult.token)
    }
    setLoginCreds({ email: "", password: "" })
  }

  return (
    <Container>
      <BasicNav authUser={ props.authUser }/>
      { formMessage.msg.length > 0 && (
        <Alert variant={formMessage.type} style={{ marginTop: "2em" }}>
          { formMessage.msg }
        </Alert>
      )}
      <div className="flex-row justify-content-center">
        <Form onSubmit={handleLogin} className="text-center signInUpForm">
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              placeholder="Enter email" 
              value={ loginCreds.email }
              onChange={ (e) => setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password"
              placeholder="Password" 
              value={ loginCreds.password }
              onChange={ (e) => setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value })}
              required
            />
          </Form.Group>
          <br/>

          <Button 
          disabled={!(loginCreds.email && loginCreds.password)}
          id="success-btn"
          variant="none"
          type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default Login