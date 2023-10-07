import './App.css';
import BrowseMatches from './views/BrowseMatches.js'
import MatchboardView  from "./views/MatchboardView.js";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
  <Routes>
    <Route path="/" element={<BrowseMatches />}></Route>
    <Route path="/createGame" element={<BrowseMatches />}></Route>
    <Route path='/match' element={<MatchboardView />}></Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
