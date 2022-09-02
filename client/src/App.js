import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import PageNotFound from "./pages/404"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import Header from "./components/Header"
import Footer from "./components/Footer"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [ authUser, setAuthUser ] = useState(null)

  const checkForValidUser = async() => {
    const authCheck = await fetch("/api/user/lookup")
    const checkResult = await authCheck.json()
    if( checkResult && checkResult.result === "success" ){
      setAuthUser(checkResult.payload)
    }
  }
  
  useEffect(() => {
    checkForValidUser()
  }, [])

  return (
    <div>
      <Header />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home authUser={ authUser } />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile">
              <Route path=":userId" element={<Profile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
