import React, { useState } from "react";
import "../styles/log.css";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const PagReg = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", telefono: ""});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí puedes enviar los datos al servidor o validar el usuario
  };

  const goToLogin = () => {
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

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
            {/* Nombre completo */}
            <FloatLabel>
              <InputText
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  padding: "1em",
                  height: "2em",
                  fontSize: "1em",
                }}
              />
              <label htmlFor="username">Nombre Completo</label>
            </FloatLabel>

            <br />
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
            <br />

            {/*telefono*/}
            <FloatLabel>
              <InputText  
              id="telefono"
              name="telefono"
              type="number"
              value={formData.telefono}
              onChange={handleChange}
              required
              style={{
                padding: "1em",
                height: "2em",
                fontSize: "1em",
              }}
              />
             <label htmlFor="email">Telefono</label>
            </FloatLabel>
             <br />
          
         
            {/* Contraseña */}
            <label
              style={{
                fontWeight: "500",
                fontSize: "1em",
                color: "rgb(2, 0, 50)",
                display: "block",
              }}
              htmlFor="password"
            >
              Contraseña
            </label>
            <Password
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              toggleMask
              feedback={true}
              required
              style={{
               
                padding: "1em",
                height: "2.5em",
                fontSize: "1.5em",
              }}
            />

            <br />
            <br />
            <br />
            <Button
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
