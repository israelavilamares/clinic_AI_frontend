import React from "react";
import "../styles/pages/registro2.css";
import { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from "react-router-dom";
import apiClient from "../api/api.js"; // axion

export default function RegTwo(){

    const [isLoading, setIsLoading] = useState(false);
    
    const [name, setName] = React.useState('');
    const [addres, setAddress] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [date, setDate] = React.useState(null);
    
    const [sexo, setSexo] = useState(null);
    const sexos = [{name: 'female', code: 'F' },
        {name: 'male', code: 'M'}
    ]; 

    const navigate = useNavigate();

    const passData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData  = new FormData(e.target);
        const data = {};
        formData.forEach((value,key)=>{
            data[key] = value;
        });
        const userId = localStorage.getItem('userId'); // Obtener el user_id del localStorage
        
        const id = parseInt(userId); // Convertir el user_id a un entero
        data.id_usuario = id;
        data.sexo = sexo.name;
   // Añadir el user_id a los datos del paciente
   console.log(data);
        try{
            const response = await apiClient.post("/register/paciente/registro2",data,{
            headers: {
              "Content-Type": "application/json",      
            },
        });
        alert("Usuario registrado exitosamente");
        localStorage.clear();        
        navigate("/login");
        }catch(error){
        if (error.response && error.response.data && error.response.data.detail) {
            // Mostrar mensaje de error específico del servidor
            alert(error.response.data.detail);
            }else{
                alert("Hubo un error al registrar el usuario");
            }
        }finally{
            setIsLoading(false);
        }

    };

   return(
    <div style={{ backgroundColor: "#ebf5fb", height: "100vh", width: "100vw", paddingTop: "1em",display: "flex",
        alignItems: "center",
        justifyContent: "center", }}>

        <div className="main-second">
        <p style={{fontSize:'3.5ex',textAlign:'justify', fontFamily:'Arial', fontWeight: 'bold', marginBottom:"2em"}}>Paciente</p>
            <form onSubmit={passData}>
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
            <FloatLabel>
                <InputText id="name" value={name} name="name"  onChange={(e) => setName(e.target.value)} required/>
                <label htmlFor="name">Nombre</label>
            </FloatLabel>
            <FloatLabel>
                <InputText className="address" id="address" name="address" value={addres} onChange={(e) => setAddress(e.target.value)} required />
                <label htmlFor="address">Direccion</label>
            </FloatLabel>

            <FloatLabel>
                <InputText id="tel" value={tel}  name="tel"  onChange={(e) => setTel(e.target.value)} keyfilter={/d{0,10}/} required/>
                <label htmlFor="tel">Telefono</label>
            </FloatLabel>
            
            <FloatLabel>
            <Dropdown  
                value={sexo} 
                id="sexo" 
                name="sexo" 
                onChange={(e) => setSexo(e.value)} // Guardar solo el código ('F' o 'M')
                options={sexos} 
                optionLabel="name" 
                placeholder="Selecciona tu sexo" 
                className="w-full md:w-14rem" 
                style={{ marginBottom: '1em' }} />
                <label htmlFor="tsexo">sexo</label>
            </FloatLabel>
  
            <FloatLabel>
                <Calendar id="date" value={date} name="date" onChange={(e) => setDate(e.value)} dateFormat="yy/mm/dd" showIcon></Calendar>
                <label htmlFor="date">Fecha de Nacimiento</label>
            </FloatLabel>


            <Button  label="Enviar" type="submit" disabled={isLoading} rounded style={{height:"60px"}}/>

            </form>
            
        </div>

    </div>
    );

}