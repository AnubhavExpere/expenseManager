import './App.css';
import Register from './pages/Register'
import Home from './pages/Home';
import TransactionsPage from './pages/TransactionsPage';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/User';
import { ModalProvider } from './context/Modal';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import AddTransaction from './components/AddTransactionModal'

function App() {
  const location = useLocation();
  
  const hideNavbarRoutes = ['/', '/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <UserProvider>
        <ModalProvider>
          { showNavbar && ( <Navbar /> ) }
          <div className='main-content'> 
            <Routes> 
              <Route path='/' element={ <ProductPage /> } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />}/>
              <Route path="/transactions" element={<TransactionsPage />} />
            </Routes>
          </div>
          <AddTransaction />
        </ModalProvider>
      </UserProvider>
    </>
  );
}

export default App;
