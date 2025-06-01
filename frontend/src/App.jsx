import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { UserContext, UserProvider } from './context/User';

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <div className='main-content'> 
          <Routes> 
            <Route path="/" element={<Home />}/>
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
