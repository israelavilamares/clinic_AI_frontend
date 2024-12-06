import React from "react";
import { useState } from 'react';
import "../styles/log.css";
import { Password } from 'primereact/password';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';


const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes enviar los datos al servidor o validar el usuario
  };

  const goToRegister = () => {
     
      navigate("/register"); // Redirige a la página de registro
  };
  
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
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}

                        style={{ width: '100%', padding: '10px'}}
                        required
                    />
                    <br />
                    <br />
                  <label style={{fontWeight:'500' ,fontSize:'1.5em', color:'rgb(75, 192, 239)',   display:'block'}} htmlFor="password">Contraseña:</label>
                  <Password
                  id="password"
                  name="password"
                  value={formData.password} // Sincroniza con el estado
                  onChange={handleChange} // Actualiza el estado
                  toggleMask
                  feedback={false}
                  //className="custom-password"
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
                <br />
                <Button onClick={goToRegister} label="Entrar" style={{display:'block',minWidth:'20vw', fontSize:'1.5em',padding:'.5em',fontWeight:'500'}}></Button>


            </form>
        </div>
      </div>
     
  
    </div>
  );
};

export default Login;
