// src/App.jsx
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/Navbar';


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const showNavBar = (location.pathname !== "/");

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
