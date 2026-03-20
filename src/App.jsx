import React from 'react'
import { NavLink, Route, Routes } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import './App.css';
// import './Navbar.css';
import './Footer.css';  
import Home from './Home';
import AboutUs from './AboutUs';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Drinks from './Drinks';
import Cart from './Cart';
import Offers from './Offers';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import Orders from './Orders';

function App() {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = "Rasoi Ghar";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥘</text></svg>";
  }, [dispatch]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">🥘 Rasoi<span className="logo-accent">Ghar</span></div>
        <div className="nav-links">
          <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink>
          <NavLink to="/veg" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Veg</NavLink>
          <NavLink to="/nonveg" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Non Veg</NavLink>
          <NavLink to="/drinks" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Drinks</NavLink>
          <NavLink to="/offers" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Offers</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              🛒
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-12px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  padding: '2px 5px',
                  borderRadius: '50%',
                  minWidth: '15px',
                  textAlign: 'center',
                  border: '1px solid white'
                }}>
                  {totalItems}
                </span>
              )}
            </span>
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Orders</NavLink>
  
          
          {user ? (
            <>
              <button className="nav-link logout-button" onClick={() => dispatch(logout())}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/Register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
              <NavLink to="/Login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
            </>
          )}
        </div>
      </nav>

      <div className="page-container">
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />}/>
          <Route path="/drinks" element={<Drinks />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/offers" element={<Offers />}/>
          <Route path="/orders" element={<Orders />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Login" element={<Login />}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;
