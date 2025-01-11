import React,{useState,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar'; 
import logochido from '../imgs/logo1.png';
import ModalPac from '../components/dialogpac';
import {Menu} from  'primereact/menu';
import { Messages } from 'primereact/messages';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../styles/pagpac.css";
import apiClient from "../api/api.js"; // axion


function PagPac(){
    const menu = useRef(null); // Referencia para el menú
   
    const [cita,setCita] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null); // State to store user data
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchUserData = async () => {
          const userId = localStorage.getItem("id");
          console.log("ID del usuario logueado:", userId);
    
          if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
          }
          try {
            
              const response = await apiClient.get(`/pacientes/${userId}/`);
              const retrievedUser = response.data;
              setUserData(retrievedUser);        
              console.log("Datos recuperados del usuario:", retrievedUser);
              
              const userPaciente = response.data[0].id_paciente;
              console.log(userPaciente);
              const citaResponse = await apiClient.get(`/citas/?paciente_id=${userPaciente}`);
              const retriveCitas = citaResponse.data;
              setCita(retriveCitas);
              console.log("Datos recuperado from citas:",retriveCitas);

          } catch (error) {
            console.error("Error fetching user data:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
            } else if (error.request) {
              console.error("Request data:", error.request);
            } else {
              console.error("Error message:", error.message);
            }
          }
        };
    
        fetchUserData();
      }, []);
    

    
    const salir = ()=>{
        localStorage.removeItem('token');
        localStorage.clear();
        navigate('/home');
    };


    const menuItems = [
        {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: salir,
        },
    ];
   
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            fontSize: '25px',
            items: [
                {label: 'servicio',
                    icon: 'pi pi-expand'

                },
            ],
        },
        {label:'CLINIC'},
    ];
    const start =  <img alt="logo" src={logochido} height="50" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar  onClick={(e) => menu.current.toggle(e)} label="U" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }}  size="large" shape="circle" />
               {/* Menú contextual */}
               <Menu model={menuItems} popup ref={menu} style={{ width: '100px', fontSize: '20px' }} />
        </div>
    );

    const id_paciente = userData?.[0]?.id_paciente || null;
    return(
            <div className='main'>
                <h2>CLINIC</h2>
                <div className="card">
                <Menubar className="nav-menu custom-menu-spacing" model={items} start={start} end={end} />
                </div> 

                <div className="dashbord">
                    <h1>Mi citas</h1>
                    <DataTable value={cita}>
                    <Column field="hora" header="hora" style={{ width: '25%'}}></Column>
                    <Column field="fecha" header="fecha" style={{ width: '25%' }}></Column>
                    <Column field="motivo" header="motivo" style={{ width: '25%' }}></Column>
                    <Column field="Acciones" header="Acciones" style={{ width: '25%' }}></Column>
                    </DataTable>
                    <Button className="btn-appo" label="Agendar Cita" icon="pi pi-calendar-clock" onClick={openModal} />
                    <ModalPac isVisible={isModalVisible} onClose={closeModal} 
                    idPaciente={id_paciente} />
                
                        {/* Display user data */}
                    {userData ? (
                      <div className="user-data">
                        <h3>Datos del Paciente</h3>
                        {userData.map((paciente, index) => (
                          <div key={index} className="paciente-card">
                             <p>
                              <strong>id:</strong> {paciente.id_paciente}
                            </p>
                            <p>
                              <strong>Nombre:</strong> {paciente.nombre}
                            </p>
                            <p>
                              <strong>Dirección:</strong> {paciente.direccion}
                            </p>
                            <p>
                              <strong>Teléfono:</strong> {paciente.tel}
                            </p>
                            <p>
                              <strong>Sexo:</strong> {paciente.sexo}
                            </p>
                            <p>
                              <strong>Estado:</strong>{" "}
                              {paciente.is_delete ? "Activo" : "Eliminado"}
                            </p>
                          </div>
                        ))}
                                          </div>
                  ) : (
                    <p>Cargando datos del paciente...</p>
                  )}

                </div>
            </div>
    );
}
export default PagPac;