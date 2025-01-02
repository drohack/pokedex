import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store"; // Or './store' depending on your project structure
import PokemonDetails from "./pages/detail/PokemonDetails/PokemonDetails"; // Import PokemonDetails
import "./App.css";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
