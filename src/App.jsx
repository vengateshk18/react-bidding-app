import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./components/login"
import Signup from "./components/signup"
import FrontPage from "./components/frontpage"
import DashBoard from "./components/dashboard"
import Category from "./components/category"
import Profile from "./components/profile"
import CurrentBid from "./components/currentbid"
import  WatchList from "./components/watchlist"
import CreateList from "./components/createlist"
function App(){
  return(
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<FrontPage/>}></Route>
           <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/dashboard" element={<DashBoard/>}></Route>
           <Route path="/category" element={<Category/>}></Route>
           <Route path="/category" element={<Category/>}></Route>
           <Route path="/profile" element={<Profile/>}></Route>
           <Route path="/currentbid" element={<CurrentBid/>}></Route>
           <Route path="/watchlist" element={<WatchList/>}></Route>
           <Route path="/createlist" element={<CreateList/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}
export default App