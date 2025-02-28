import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetails from "./pages/detail/PokemonDetails/PokemonDetails"; // Import PokemonDetails
import "./App.css";
import Home from "./pages/home/home";
import Favorites from "./pages/Favorites/Favorites"
import Ultimate151 from "./pages/Ultimate151/Ultimate151";
import NavBar from "./components/NavBar/NavBar";
import { FaQuestionCircle } from 'react-icons/fa';
import InfoPopup from "./components/InfoPopup/infoPopup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeFavorites, initializeLocks } from "./features/favorites/favoritesSlice";
import { initializeUltimate151 } from "./pages/Ultimate151/ultimate151Slice";

function App() {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(initializeFavorites())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLocks())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUltimate151())
  }, [dispatch])

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <BrowserRouter basename="/pokedex/">
      <div className="App">
      {/* <h1>Pokedex</h1>*/}
        <NavBar />
        <button className="info-btn" onClick={togglePopup}>
          <FaQuestionCircle />
        </button>
        {showPopup && <InfoPopup onClose={togglePopup} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon/:pokemonName"
            element={<PokemonDetails />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/ultimate151" element={<Ultimate151 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
