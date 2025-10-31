import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path='/'
          element={user ? <HomePage /> : <Navigate to='Login' />} />

        <Route path='/login'
          element={<Login />} />

        <Route path='/register'
          element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;