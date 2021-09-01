import './App.css';
import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { refreshShifts } from './redux/actionCreators';
import Routes from './Routes';
function App() {
  const user = useSelector(({user})=> user, shallowEqual);
  return (
    <div className="App">
      {user.id ? 
        <h1> HELLO {user.username} </h1> :
        <h1>PLEASE LOGIN</h1>
      }
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
