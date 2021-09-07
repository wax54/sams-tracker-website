import './App.css';
import React from 'react';
import NavBar from '../NavBar';
import Routes from '../Routes';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes />
      <h3>Footer</h3>
    </div>
  );
}

export default App;
