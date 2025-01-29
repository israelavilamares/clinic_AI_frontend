import React from "react";
import { useState } from 'react';
import { useNavigate, useRouteError } from "react-router-dom";
import "../styles/log.css";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import apiClient from "../api/api.js"; // axion

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    const formData  = new FormData(e.target);
    console.log(formData);
    try {
        const response = await apiClient.post("/login",formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
  
        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("id", response.data.id);
          const userId = response.data.id;


          // Redirige según el rol del usuario
    
          if (response.data.rol === 'paciente') {
              navigate(`/paciente/${userId}/`);
          } else if (response.data.rol === "doctor") {
              navigate("/doctores");
          } else {
              alert("Rol desconocido");
          }
      }
    } catch (error) {
        console.error("Error en la autenticación:", error);
        alert("Usuario o contraseña incorrectos");
    }finally{
      setIsLoading(false);
    }
};

  const goToRegister = () => { navigate("/register");}; 
  
  return (
    <div className="conteinerLogin"> 
     
      <div className="div-reg">
  
        <div className="contenido">
 
        <p style={{display:'block', color:'white',fontSize:'1.5em',padding:'1em'}} >Orgaiza tus citas</p>
        <p style={{display:'block', color:'white',fontSize:'1.5em'}} >Eficiencia en la salud</p>

          <label htmlFor="register" style={{display:'block', color:'white',fontSize:'1em',padding:'1em'}}>No tienes cuenta Registrate?</label>
          
          <Button onClick={goToRegister} label="Registar" style={{display:'block',minWidth:'20vw', fontSize:'1.5em',padding:'1em',fontWeight:'500'}}></Button>
        </div>
      </div>
      <div className="div-log">
        <div className="form-log">
       
        <h2 style={{fontWeight:'700' ,fontSize:'2.5em', color:'rgb(75, 192, 239)',marginBottom:'10%'}} >Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                  <label style={{fontWeight:'500' ,fontSize:'1.5em', color:'rgb(75, 192, 239)'}} htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        style={{ width: '100%', padding: '10px'}}
                        required
                    />
                    <br />
                    <br />
                  <label style={{fontWeight:'500' ,fontSize:'1.5em', color:'rgb(75, 192, 239)',   display:'block'}} htmlFor="password">Contraseña:</label>
                  <Password
                    id="password"
                    name="password"
                    toggleMask
                    feedback={false}
                    required
                  inputStyle={{
                    marginTop:'10px',
                    display:'block',
                    marginLeft:'5px',
                    height: '2.5em', // Cambia la altura
                    fontSize: '1em', // Cambia el tamaño de fuente
                    padding: '10px', // Ajusta el relleno
                    width:'20vw'
                  }}
                />               
                <br />
                <br />
                {isLoading && (
                  <ProgressSpinner 
                    style={{
                      position: 'absolute', // Fijar el spinner en la ventana
                      top: '50%', // Centrar verticalmente
                      left: '50%', // Centrar horizontalmente
                      transform: 'translate(-50%, -50%)', // Ajustar el punto de referencia
                      width:'25vw',
                      height:'25vh',
                      margin: '20px auto',
                    }} 
                  />
                )}
                <Button 
                  label="Entrar" 
                disabled={isLoading} // Deshabilita el botón mientras se carga
                  style={{
                    display: 'block',
                    minWidth: '20vw',
                    fontSize: '1.5em',
                    padding: '.5em',
                    fontWeight: '500'
                  }}
                />

            </form>
        </div>
      </div>
     
  
    </div>
  );
};

export default Login;
