import './App.css';
import NavBar from './NavBar';
import Header from './Header';
import Dashboard from './Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { authorizeUser } from './redux/actionCreators';
import LoginForm from './Forms/Login';
import SignupForm from './Forms/Signup';

function App() {
  const user = useSelector(({user})=> user);
  return (
    <div className="App">
      <h1>{Object.keys(user).map(key => user[key])}</h1>
      <LoginForm />
      <SignupForm />
      <NavBar />
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
