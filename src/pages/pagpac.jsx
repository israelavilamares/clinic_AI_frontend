  import React,{useState,useEffect,useRef} from "react";
  import { Dropdown } from 'primereact/dropdown';
  import {InputText} from 'primereact/inputtext';
  import { FloatLabel } from 'primereact/floatlabel';
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
  import { Tag } from 'primereact/tag';
  import { Dialog } from 'primereact/dialog';
  import "../styles/pagpac.css";
  import apiClient from "../api/api.js"; // axion
  


  function PagPac(){
      const msg = useRef(null);
      const menu = useRef(null); // Referencia para el menú
      const [cita,setCita] = useState([]);
      const [deleteProductDialog, setDeleteProductDialog] = useState(false); // Estado para controlar el diálogo
      const [selectedCita, setSelectedCita] = useState(null); 
      const [isModalVisible, setModalVisible] = useState(false); // modal eliminar
      const [idPaciente, setIdPaciente] = useState(null); // Nuevo estado para id_paciente
      const [userData, setUserData] = useState(null); 
      const openModal = () => setModalVisible(true);
      const closeModal = () => setModalVisible(false);    
      const navigate = useNavigate();
      //modal de editar
      const [visible, setvisible] = useState(false); //modal editar
      const [Currentedit, setSelectedEdit] = useState(null); //id para hacer put
      //formulario
      const [motivo,setMotivo] = useState("");
      const [estado,setEstado] = useState("");
      const estados = ["pendiente", "cancelada","completada"];

      
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

                const userPaciente = retrievedUser[0].id_paciente; // Asumiendo que es un array
                setIdPaciente(userPaciente); // Guarda id_paciente en el estado
                console.log("ID del paciente:", userPaciente);

                const citaResponse = await apiClient.get(`/citas/?paciente_id=${userPaciente}`);
                const retrievedCitas = citaResponse.data;
                setCita(retrievedCitas);
                console.log("Datos recuperados de citas:", retrievedCitas);

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
    
      const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.estado} severity={getSeverity(rowData)}  style={{ fontSize: '1em', padding:'0.4em' }}></Tag>;
      };
    
      const getSeverity = (cita) => {
        switch (cita.estado) {
          case 'pendiente':
            return 'success'; // Green tag
          case 'cancelada':
            return 'danger'; // Red tag
          case 'completada':
            return 'info'; // Blue tag
          default:
            return null; // No tag
        }
      };
 
      const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
        setSelectedCita(null);
      };
    
      const showDeleteProductDialog = (rowData) => {
        if (!rowData || !rowData.id) {
          console.error("Invalid row data:", rowData);
          return;
        }
        setSelectedCita(rowData); // Guardar la cita seleccionada
        setDeleteProductDialog(true); // Mostrar el diálogo
      };
    

      const confirmDeleteProduct = async () => {
        console.log(selectedCita);
        if (!selectedCita) return;
    
        try {
          // Realizar la solicitud DELETE
          await apiClient.delete(`/citas/?paciente_id=${selectedCita.id}`);
          
          // Mostrar mensaje de éxito
          msg.current.show({
            severity: "success",
            summary: "Éxito: ",
            detail: "Cita eliminada correctamente.",
            life: 3000,
          });
    
          // Actualizar el estado para reflejar la eliminación
          const updatedCitas = cita.filter((c) => c.id !== selectedCita.id);
          setCita(updatedCitas);
        } catch (e) {
          console.error("Error eliminando la cita: ", e);
          // Mostrar mensaje de error
          msg.current.show({
            severity: "error",
            summary: "Error: ",
            detail: "No se pudo eliminar la cita.",
            life: 3000,
          });
        } finally {
          hideDeleteProductDialog(); // Cerrar el diálogo
        }
      };
      
      const loadCItas = async () => {
        if (!idPaciente) {
            console.error("ID del paciente no disponible.");
            return;
        }

        try {
            const citasResponse = await apiClient.get(`/citas/?paciente_id=${idPaciente}`);
            setCita(citasResponse.data);


            msg.current.show({
                severity: "success",
                summary: "Éxito: ",
                detail: "Citas recargadas correctamente.",
                life: 3000,
            });
        } catch (error) {
            console.error("Error recargando las citas:", error);

            msg.current.show({
                severity: "error",
                summary: "Error: ",
                detail: "No se pudieron recargar las citas.",
                life: 3000,
            });
        }
    };
    // EDitar cita
      const editCita =  async (e)=>{
        e.preventDefault(); // Prevenir que el formulario recargue la página
        console.log(Currentedit.id);
        if(!Currentedit)return;      
        try{
         // Crear el payload con los datos del formulario
         const dataL = {
          
          motivo,
          estado,
        };
        await apiClient.put(`/citas/?id=${Currentedit.id}`,dataL,{headers:{"Content-Type": "application/json"},
        });

        }catch(error){
          console.error("error al actualizar cita",error);
        }finally{
          hideDialogEdit();
        }       
      }

      const showDialogEdit = (rowData) =>{
          console.log(rowData);
        if (!rowData || !rowData.id) {
          console.error("Invalid row data:", rowData);
          return;
        }
        setSelectedEdit(rowData);
        setvisible(true); // Mostrar el diálogo      
        }

      const hideDialogEdit = () =>{
        setvisible(false);
        setSelectedEdit(null);
      }

      const actionsBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => showDialogEdit(rowData)} />
          <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => showDeleteProductDialog(rowData)} />

          </React.Fragment>
        );
      };

      const id_paciente = userData?.[0]?.id_paciente || null;
      return(
              <div className='main'>
                  <h2>CLINIC</h2>
                  <div className="card">
                  <Menubar className="nav-menu custom-menu-spacing" model={items} start={start} end={end} />
                  </div> 
                  <div className="dashbord">
                      <h1>Mi citas</h1>
                  <Button
                      label="Recargar Citas"
                      icon="pi pi-refresh"
                      style={{padding:".5em", marginBottom:".5em", marginTop:".5em", position:"relative",left:"80%"}}
                      onClick={loadCItas}
                    />
                      <Messages ref={msg} />
                      <div className="card">
                      <DataTable value={cita} paginator rows={5}>
                      <Column className="col" field="hora" header="hora" sortable  style={{ minWidth: '12rem' }}></Column>
                      <Column className="col" field="fecha" header="fecha" sortable style={{ minWidth: '12rem' }}></Column>
                      <Column className="col" field="motivo" header="motivo" style={{ minWidth: '12rem' }} ></Column>
                      <Column className="col" field="estado"  header="estado" sortable style={{ minWidth: '12rem' }} body={statusBodyTemplate}></Column>
                      <Column body={actionsBodyTemplate}style={{ minWidth: '20rem' }}></Column>
                      </DataTable>
                      </div>
                   
                      <Button className="btn-appo" label="Agendar Cita" icon="pi pi-calendar-clock" onClick={openModal} />
                      
                      <ModalPac isVisible={isModalVisible} onClose={closeModal} 
                      idPaciente={id_paciente} />
                  
                         {/* Diálogo de confirmación para eliminar cita */}
                      <Dialog
                        className="model-delete" 
                        visible={deleteProductDialog}
                        onHide={hideDeleteProductDialog}
                        header="Confirmar Eliminación"
                        footer={
                          <div>
                            <Button label="No" icon="pi pi-times" onClick={hideDeleteProductDialog}  />
                            <Button label="Sí" icon="pi pi-check" onClick={confirmDeleteProduct}/>
                          </div>
                        }
                      >
                        <p>¿Estás seguro de que deseas eliminar esta cita?</p>
                      </Dialog>


                      {/* Diálogo de edit cita */}

                      <Dialog  
                      className="model-edit" 
                      visible={visible}
                      onHide={hideDialogEdit}
                      header="Editar Cita"
                      >
                        <form onSubmit={editCita} >
                          <FloatLabel>
                            <InputText id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)}  />
                            <label htmlFor="motivo">Motivo</label>
                          </FloatLabel>
                          <Dropdown value={estado} onChange={(e) =>setEstado(e.value)} options={ estados } optionLabel="estatus" placeholder="selecciona un status" className="w-full md:w-14rem" required/>
                          <Button label="save" type="submit"><i className="pi pi-save" style={{ fontSize: '1.5rem' }}></i></Button>
                          <Button label="close" onClick={hideDialogEdit}> <i className="pi pi-times" style={{ fontSize: '1.5rem' }}></i> </Button>
                        </form>
                      </Dialog>


                          {/* Display user data */}
                      {userData ? (
                        <div className="user-data">
                          <h2>Datos del Paciente</h2>
                          {userData.map((paciente, index) => (
                            <div key={index} className="paciente-card">
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