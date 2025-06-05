import './App.css';
import Register from './pages/Register'
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/User';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';

function App() {
  const location = useLocation();
  
  const hideNavbarRoutes = ['/', '/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <UserProvider>
        { showNavbar && ( <Navbar /> ) }
        <div className='main-content'> 
          <Routes> 
            <Route path='/' element={ <ProductPage /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />}/>
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
