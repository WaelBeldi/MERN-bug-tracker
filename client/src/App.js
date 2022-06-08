import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './Components/NavBar/NavBar'
import Auth from './Components/Auth/Auth'
import MainView from './Components/MainView/MainView';
import './App.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <BrowserRouter>
      <NavBar setUser={setUser} />
      { !user ? <Auth setUser={setUser} /> : <MainView /> }
    </BrowserRouter>
  );
}

export default App;
