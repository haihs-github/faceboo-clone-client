import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
          element={user ? <HomePage /> : <Navigate to='Login' />} />

        <Route path='/Login'
          element={<Login />} />

        <Route path='/Register'
          element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;