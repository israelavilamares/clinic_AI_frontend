import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import "../styles/consult.css";
//import { data } from "react-router-dom";    
//import { use } from "react";
//id_paciente
export default function ModalPac({ isVisible, onClose, idPaciente }) {




    const [value, setValue] = useState('');
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
        {time: '5:30', code:'18'}

    ];

    const loadData = async (e) => {
        e.preventDefault();
        
    }


    return (
        <Dialog 
            visible={isVisible}
            modal
            onHide={onClose}
            className="card flex justify-content-center">
            <div style={{height:'60vh', width:'50vw', padding:'30px'}} className="main-dialog">
                <h2>Registrar Cita</h2>
                <div>
                    <form className="appoiment" onSubmit={loadData}>
                    <FloatLabel>
                    <Calendar value={date} onChange={(e)=> setDate(e.value)} dateFormat="yy-mm-dd"/>
                    <label htmlFor="fecha">Fecha</label>
                    </FloatLabel>
                    <Dropdown value={selectTime} onChange={(e) =>  setSelectTime(e.value)} options={ times } optionLabel="time" placeholder="selecciona un horario" className="w-full md:w-14rem" />
                    <FloatLabel>
                    <InputText id="motivo" value={value} onChange={(e) => setValue(e.target.value)} />
                    <label htmlFor="motivo">Motivo</label>
                    </FloatLabel>
                    <Button label="Registrar" type="submit" onClick={onClose} style={{display:"flex", height:"3em" 
                    }}/>
                    
                    </form>
                
                </div>
            </div>
        </Dialog>
    );
}
