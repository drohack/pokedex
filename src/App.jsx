import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store"; // Or './store' depending on your project structure
import PokemonList from "./components/PokemonList/PokemonList";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails"; // Import PokemonDetails
import "./App.css";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/pokemon/:pokemonName"
            element={<PokemonDetails />}
          />{" "}
          {/* Route for details */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
