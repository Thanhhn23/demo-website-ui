import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Link
} from "react-router-dom";
import axios from "axios"

import Home from "./component/Home";
import Customer from "./component/Customer";
import Order from "./component/Order";
import About from "./component/About";
import Login from "./component/Login";

import { getCookieValue, setCookie } from "./function/cookie";

import './App.css'

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookieValue('token');

    if (token) {
      axios.get('https://demo-website-api.vercel.app/api/v1/authenticate', {
        headers: {
          Authorization: token
        }
      })
        .then(response => response.data)
        .then(data => {
          //console.log('user', data)
          if (data.username) {
            setIsAuthenticated(true);
          }

        })
        .catch(e => {
          console.log(e);
        })
    }
    setIsLoading(false);


  }, []);

  function handleLogout(){    
      setIsAuthenticated(false);
      document.cookie = `token = false;`    
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  else if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="container">
     <div className="menu">
  <nav>
    <ul>
      <li>
        <i className="fas fa-bars"></i>
        <Link to="/"> Home</Link>
      </li>
      <li>
        <i className="fas fa-users"></i>
        <Link to="/customers"> Customers</Link>
      </li>
      <li>
        <i className="fas fa-border-all"></i>
        <Link to="/orders"> Orders</Link>
      </li>
      <li>
        <i className="fas fa-info-circle"></i>
        <Link to="/about"> About</Link>
      </li>
    </ul>
  </nav>
  <div>
    <button className="button-logout" onClick={handleLogout}>
      <i className="fas fa-sign-out-alt"></i>
      Log out
    </button>
  </div>
</div>



      <div className="main">
        <Routes>
          <Route path="/customers" element={<Customer />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}



