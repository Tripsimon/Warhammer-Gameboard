import './App.css';
import BrowseMatches from './views/BrowseMatches.js'
import MatchboardView  from "./views/MatchboardView.js";
import CreateMatch from './views/CreateMatch.js'
import LoginScreen from './views/LoginScreen';
import AdminPage from './views/AdminPage.js';
import CreateFacility from './views/CreateFacility';
import CreateFraction from './views/CreateFraction';
import CreateDetachment from './views/CreateDetachment';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
  <Routes>
    <Route path="/" element={<LoginScreen />}></Route>
    <Route path="/browseMatches" element={<BrowseMatches />}></Route>
    <Route path='/match' element={<MatchboardView />}></Route>
    <Route path="/createMatch" element={<CreateMatch />}></Route>
    <Route path="/adminPage" element={<AdminPage/>}></Route>
    <Route path="/createFacility" element={<CreateFacility/>}></Route>
    <Route path="/createFraction" element={<CreateFraction/>}></Route>
    <Route path="/createDetachment" element={<CreateDetachment/>}></Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
