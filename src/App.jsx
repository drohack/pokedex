import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokemonList from './components/PokemonList/PokemonList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <h1>Pokedex</h1>
     <PokemonList />
    </div>
  )
}

export default App
