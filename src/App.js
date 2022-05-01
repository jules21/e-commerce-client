import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink , Routes} from 'react-router-dom';
import Product from './components/products/Product';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


const products = {}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
