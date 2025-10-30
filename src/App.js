import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const user = null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
          element={user ? <HomePage /> : <Navigate to='Login' />} />

        <Route path='/Login'
          element={user ? <Navigate to="Login" /> : <Login />} />

        <Route path='/Register'
          element={user ? <Navigate to="Register" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;