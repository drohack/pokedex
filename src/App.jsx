import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import store from './app/store'; // Or './store' depending on your project structure
import PokemonList from './components/PokemonList/PokemonList';
import PokemonDetails from './components/PokemonDetails/PokemonDetails'; // Import PokemonDetails
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Pokedex</h1> {/* Keep your heading */}
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} /> {/* Route for details */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;