import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className='main-content'> 
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
