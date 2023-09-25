import './App.css';

import Navbar from './components/Navbar.js'
import GameboardPage from './components/Gameboard.js'

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      <Navbar></Navbar>
      <GameboardPage></GameboardPage>
    </div>
  );
}

export default App;
