import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import CreateCategory from "./pages/CreateCategory"
import Home from "./pages/Home"
import HowToPlay from "./pages/HowToPlay"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import User from "./pages/User"
import PublicCategories from "./pages/PublicCategories"
import SignUp from "./pages/SignUp"
import UserCategories from "./pages/UserCategories"
import BasicNav from "./components/BasicNav"
import Footer from "./components/Footer"

import "bootstrap/dist/css/bootstrap.min.css"
import { ChakraProvider } from '@chakra-ui/react'

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
      <BasicNav authUser={ authUser } />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home authUser={ authUser } />} />
            <Route path="/HowToPlay" element={<HowToPlay />} />
            <Route path="/PublicCategories" element={<PublicCategories />} />
            <Route path="/MyCategories" element={<UserCategories />} />
            <Route path="/CreateCategory" element={<CreateCategory />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile">
              <Route path=":userId" element={<User />} />
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
