import React, { useState } from "react";
import "../styles/log.css";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import apiClient from "../api/api.js";

const PagReg = () => {

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validar_password = 
    try {
      //console.log("Datos enviados:", formData);
      const respuesta = await apiClient.post('/register', formData);
      console.log("Respuesta del servidor:", respuesta.data);
      const userId_ = respuesta.data.user_id;
      alert("Usuario registrado exitosamente");
      console.log("paso1")      
      localStorage.setItem('userId', userId_); // Guardar el user_id en localStorage
      console.log(userId_);
      navigate("/register/paciente/registro2"); // Redirige después de un registro exitoso
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        // Mostrar mensaje de error específico del servidor
        alert(error.response.data.detail);
      } else {
        // Mensaje genérico para otros errores
        alert("Hubo un error al registrar el usuario");
      }
    }
  };
  
  const goToLogin = () => {
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

// pages rest
  return (
    <div className="conteinerLogin">
      <div className="div-reg">
        <div className="contenido">
          <p style={{ display: "block", color: "white", fontSize: "1.5em", padding: "1em" }}>
            Organiza tus citas
          </p>
          <p style={{ display: "block", color: "white", fontSize: "1.5em" }}>
            Eficiencia en la salud
          </p>
          <label
            htmlFor="register"
            style={{ display: "block", color: "white", fontSize: "1em", padding: "1em" }}
          >
            ¿Ya tienes cuenta?
          </label>
          <Button
            onClick={goToLogin}
            label="Inicio de Sesión"
            style={{ display: "block", minWidth: "20vw", fontSize: "1.5em", padding: "1em", fontWeight: "500" }}
          />
        </div>
      </div>
      <div className="div-log">
        <div className="form-log">
          <h2
            style={{
              fontWeight: "700",
              fontSize: "2em",
              color: "rgb(75, 192, 239)",
              marginBottom: "10%",
            }}
          >
            Registrar
          </h2>
          <form onSubmit={handleSubmit}>
            <br />

            {/* Email */}
            <FloatLabel>
              <InputText
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: "1em",
                  height: "2em",
                  fontSize: "1em",
                }}
              />
              <label htmlFor="email">Correo Electrónico</label>
            </FloatLabel>

              <br />
     

              {/* username */}
              <FloatLabel>
              <InputText
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  padding: "1em",
                  height: "2em",
                  fontSize: "1em",
                }}
              />
              <label htmlFor="email">Nombre de usuario</label>
            </FloatLabel>
            <br />

             <br />          
         
            {/* Contraseña */}
            <label htmlFor="password"
              style={{
                fontWeight: "500",
                fontSize: "1em",
                color: "rgb(2, 0, 50)",
                display: "block",
              }} 
            ></label>

            <Password
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              toggleMask
              feedback={true}
              required
              style={{
               marginBottom:"1em",
                width:"2.5em",
                padding: ".5em",
                height: "2.5em",
                fontSize: "1.5em",
              }}
            />
            <br />
            <Button
              type="submit"
              label="Registrar"
              style={{
                display: "block",
                minWidth: "18vw",
                fontSize: "1.5em",
                padding: ".3em",
                fontWeight: "500",
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PagReg;
