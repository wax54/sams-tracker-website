import './App.css';
import NavBar from './NavBar';
import Header from './Header';
import Dashboard from './Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeUser } from './redux/actionCreators';

function App() {
  const dispatch = useDispatch();
  dispatch(authorizeUser({ username: "hello", password: 'goodbye' }));
  const user = useSelector(({user})=> user);
  return (
    <div className="App">
      <h1>{Object.keys(user)}</h1>
      <NavBar />
      <Header /> 
      <Dashboard />
    </div>
  );
}

export default App;
