import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetails from "./pages/detail/PokemonDetails/PokemonDetails"; // Import PokemonDetails
import "./App.css";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites"
import NavBar from "./components/NavBar/NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeFavorites } from "./features/favorites/favoritesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFavorites())
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
      <h1>Pokedex</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon/:pokemonName"
            element={<PokemonDetails />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
