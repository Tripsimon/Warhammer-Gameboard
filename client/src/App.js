import './App.css';

import Navbar from './components/Navbar.js'
import GameboardPage from './components/Gameboard.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" data-bs-theme="dark" >
      <Navbar></Navbar>
      <GameboardPage></GameboardPage>
    </div>
  );
}

export default App;
