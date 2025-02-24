import {useEffect,useState} from 'react';
import React from "react";
import { Fragment } from 'react';
import { Avatar } from 'primereact/avatar';
import { Toolbar } from 'primereact/toolbar';
import '../styles/pages/pg_doctor.css';
import apiClient from '../api/api';

function PagDoc(){

    const [cita, setCita] = useState([]);
    const [doctor, setDoctor] = useState([]);

    var idDoc = localStorage.getItem("id");

    const getDoctor = async (id) => {
        try{
         const response = await apiClient.get(`/doctor/citas/${id}`);
         setCita(response.data);
         console.log(response.data);
        }catch(error){ console.log(error); 
        }
    }

    const getMe = async (id) => {
        try{
            const response = await apiClient.get(`/doctor/me/${id}`);
            setDoctor(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
    getDoctor(idDoc);
    getMe(idDoc);
    },[]);


    const close_session = () =>{
        localStorage.clear();
        window.location.href = "/"; 
    }

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-2">
            <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle"/>
            <span>{doctor.nombre}</span>
            </div>
        </React.Fragment>     
    ); 
   

    return(
        <div className="root">
            <header className="card-menu-bar">
            <Toolbar start={endContent}  className="bg-gray-900 shadow-2" style={{ padding:'1rem',width:'80vw', display:'block',margin:'0 auto',borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} />
            </header>
            <section className="card-body">
            <h1>esta es la pagina de Doctores</h1>
            <p>Doctores</p>
           <span> <button onClick={close_session}>cerrar session</button></span>
            </section>
        </div>
    );
}

export default PagDoc;