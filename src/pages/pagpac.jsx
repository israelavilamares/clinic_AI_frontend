import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';

function PagPac(){

    const navigate = useNavigate();
    
    const salir = ()=>{
        localStorage.removeItem('token');
        navigate('/home');
    };


    return(
        <div>
            <h1>esta es la pagina de paciente</h1>
            <p>holasd</p>
            <Button  type="submit"
                onClick={salir}
              label="Registrar"
              style={{
                display: "block",
                minWidth: "18vw",
                fontSize: "1.5em",
                padding: ".3em",
                fontWeight: "500",
              }}>
                hola
            </Button>
        </div>
    );
}

export default PagPac;