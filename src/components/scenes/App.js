import './App.css';
import React from 'react';
import NavBar from '../NavBar';
import Routes from '../Routes';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
function App() {
  const currentlySyncing = useSelector( ({syncing}) => Object.keys(syncing).length > 0 );
  //TODO
  // errors = useSelector( ({errors}) => errors);
  // {errors.length ? <>errors.map(e => <EDisplay e={e} />)</> : null}
  // <Error />(ie. 'Type 'any time' is not available') in reference to <ShiftCard shift={shift}/> or <GoalCard goal={goal}/>
  return (
    <div className="App">
      <NavBar />
      <Routes />
      
      {currentlySyncing ? <Loader /> : null}

    </div>
  );
}

export default App;
