import './App.css';
import React, { useEffect } from 'react';
import NavBar from '../NavBar';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { refreshShifts } from '../../models/redux/actionCreators';
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
