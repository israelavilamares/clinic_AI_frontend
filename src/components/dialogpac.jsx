import React, { useState,useRef,useEffect} from "react";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Messages } from 'primereact/messages';
import "../styles/consult.css";
import apiClient from "../api/api.js"; // axion



export default function ModalPac({ isVisible, onClose, idPaciente }) {
    const[id_medico,setId] = useState(null); //necesaria para las id's de los medicos
    const[listaMed,setListMedicos] = useState([]); // inicializo como un array vacio
    const datamedico = async () => {
        try {
            const response = await apiClient.get(`/medicos/`);
            if (response.data.length > 0) {
                const ids = response.data.map(medicoid => medicoid.id_medico);

                setId(ids); //i must get just id de cada medico
                setListMedicos(response.data);
                console.log(id_medico);
            }
        } catch(e) {
            console.error("Error", e);
        } 
    }

    useEffect(() => {
        datamedico();
    },[]);

    const msgs = useRef(null); 
    const [is_loading,setLoading] = useState(false);
    const [motivo, setValue] = useState('');
    const [date, setDate] = useState(null);
    const [selectTime, setSelectTime] = useState(null);
    const times = [
        {time: '9:00', code:'1'},
        {time: '9:30', code:'2'},
        {time: '10:00', code:'3'},
        {time: '10:30', code:'4'},
        {time: '11:00', code:'5'},
        {time: '11:30', code:'6'},
        {time: '12:00', code:'7'},
        {time: '12:30', code:'8'},
        {time: '1:00', code:'9'},
        {time: '1:30', code:'10'},
        {time: '2:00', code:'11'},
        {time: '2:30', code:'12'},
        {time: '3:00', code:'13'},
        {time: '3:30', code:'14'},
        {time: '4:00', code:'15'},
        {time: '4:30', code:'16'},
        {time: '5:00', code:'17'},
        {time: '5:30', code:'18'},

    ];
    const [error, setError] = useState(null); // Estado para manejar errores}

    const loadData = async (e) => {
        e.preventDefault();
        setError(null); 
        try{
            const time = selectTime?.time || null; // Extraer solo el valor del horario seleccionado
            const payload = {
                id_paciente: idPaciente,
                fecha: date,
                hora: time,
                motivo: motivo,
                id_medico: id_medico
            };
            console.log(payload);
            await apiClient.post("/send/citas", payload, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            alert("Cita registrada");
            
            onClose(); // Cerrar el modal

            } catch (err) {
            if (err.status === 400) {
                    // Duplicate appointment
                    msgs.current.clear();
                    msgs.current.show({
                      severity: "warn",
                      summary: "Advertencia: ",
                      detail: err.response.data.detail,
                      life: 3000,
                });
            }else{
                 // Other errors
                 msgs.current.clear();
                 msgs.current.show({
                   severity: "error",
                   summary: "Error",
                   detail: "Error al recuperar los datos del usuario.",
                   life: 3000,
                 });
            }
                // Manejar errores del servidor o de red
            } finally {
                setLoading(false); // Finalizar el estado de cargando
            }
        };


    return (
        <Dialog 
            visible={isVisible}
            modal
            onHide={onClose}
            className="card flex justify-content-center">
            <div style={{height:'60vh', width:'50vw', padding:'30px', position:'relative'}} className="main-dialog">
                
                <h2>Registrar Cita</h2>
                    <Messages ref={msgs} />
                <div>
                {is_loading && (
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 10,
                    }}
                >
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                </div>)}
                    <form className="appoiment" onSubmit={loadData}>
                        <FloatLabel className="w-full md:w-14rem">
                            <Dropdown inputId="dd-city" value={id_medico} onChange={(e) => setId(e.value)} options={listaMed} optionLabel="nombre" className="w-full"  optionValue="id_medico"/>
                            <label htmlFor="dd-city">Selecciona a un doctor</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Calendar value={date} onChange={(e)=> setDate(e.value)} dateFormat="yy-mm-dd" required/>
                            <label htmlFor="fecha">Fecha</label>
                        </FloatLabel>
                            <Dropdown value={selectTime} onChange={(e) =>  setSelectTime(e.value)} options={ times } optionLabel="time" placeholder="selecciona un horario" className="w-full md:w-14rem" required/>
                            {/*<Dropdown value={selectTime} onChange={(e) =>  setSelectTime(e.value)} options={ times } optionLabel="doctor" placeholder="selecciona un doctor" className="w-full md:w-14rem" required/>*/}
                        <FloatLabel>
                            <InputText id="motivo" value={motivo} onChange={(e) => setValue(e.target.value)} required />
                            <label htmlFor="motivo">Motivo</label>
                        </FloatLabel>
                
                        <Button label="Registrar" type="submit" disabled={is_loading} style={{display:"flex", height:"3em"}}/>
                        
                    
                    </form>
                
                </div>
            </div>
        </Dialog>
    );
}
