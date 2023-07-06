import React from "react";
import "./style.css";
import Movies from "./pages/Movies/Movies"
import Series from "./pages/Series/Series"
import Trending from "./pages/Trending/Trending"
import Search from "./pages/Search/Search"
import Navbar from "./components/Navbar/Navbar"
import {
  BrowserRouter ,
  Routes,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <>
    <BrowserRouter>
  <Navbar />
  <Routes>
      <Route path="/" element={<Trending />} />
     
      <Route path="Movies" element={<Movies />} />
      <Route path="Search" element={<Search />} />
      <Route path="Trending" element={<Trending />} />
      <Route path="Series" element={<Series />} />
    </Routes>
  </BrowserRouter>
  </>
  );
}
