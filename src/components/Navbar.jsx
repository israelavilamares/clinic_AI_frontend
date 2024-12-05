import React from 'react';
import "../styles/NavbarHome.css";
import {Button} from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const NavbarHome = () => {

  const navigate = useNavigate();
  const handleLoginClick =()=>{
    navigate("/login");
  };


  return (
    <header className="navbar-home">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="#Home">Clinic</a>
        </div>
        <nav className="navbar-links">
          
        <li><a className="navbar-link" href="#about">Sobre Nosotros</a></li>
        <li><a className="navbar-link" href="#services">Nuestro Servicios</a></li>
        <li><Button label="Login" onClick={handleLoginClick}  className='btnLogin' style={{ width: '11vw', height: '5.5vh', background:'black', fontSize:'1.5em'}}/></li>
        </nav>
      </div>
    </header>
  );
};

export default NavbarHome;


