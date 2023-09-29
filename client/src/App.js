import './App.css';
import GameboardPage from './views/MatchboardView.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" data-bs-theme="dark" >
      <GameboardPage></GameboardPage>
    </div>
  );
}

export default App;
