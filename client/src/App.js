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
import Footer from "./components/Footer"

import GameSetup from "./gamePages/GameSetup"
import HowToPlayGame from "./gamePages/HowToPlayGame"
import Play from "./gamePages/Play"
import Scoreboard from "./gamePages/Scoreboard"
import Category from "./gamePages/Category"
import Movie from "./gamePages/Movie"

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
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home authUser={ authUser } />} />

            {/* Non-gameplay pages */}
            <Route path="/HowToPlay" element={<HowToPlay authUser={ authUser } />} />
            <Route path="/PublicCategories" element={<PublicCategories authUser={ authUser } />} />
            <Route path="/MyCategories" element={<UserCategories authUser={ authUser } />} />
            <Route path="/CreateCategory" element={<CreateCategory authUser={ authUser } />} />
            <Route path="/Login" element={<Login authUser={ authUser } />} />
            <Route path="/SignUp" element={<SignUp authUser={ authUser } />} />
            <Route path="/Profile">
              <Route path=":username" element={<User authUser={ authUser } />} />
              <Route path="" element={<User authUser={ authUser } />} />
            </Route>

            {/* Gameplay pages */}
            <Route path="/GameSetup" element={<GameSetup authUser={ authUser } />} />
            <Route path="/HowToPlayGame" element={<HowToPlayGame authUser={ authUser } />} />
            <Route path="/Play" element={<Play authUser={ authUser } />} />
            <Route path="/Scoreboard" element={<Scoreboard authUser={ authUser } />} />
            <Route
              path="/Play/:categoryId"
              element={<Category authUser={authUser} />}
            />
            <Route
              path="/Play/:categoryId/:movieId"
              element={<Movie authUser={authUser} />}
            />


            {/* Page not found */}
            <Route path="*" element={<PageNotFound authUser={ authUser } />} />
          </Routes>
        </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
