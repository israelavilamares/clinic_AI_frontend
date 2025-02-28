import React, { useEffect,useState } from "react";
import apiClient from "../api/api";
function PagAdmin() {

    const[doc,setDoc] = useState([])

    const id = localStorage.getItem("id")
    console.log(id);
    const getDoc = async() =>{   
        try{
            const response = await apiClient.get(`/adm/`);
            console.log("datos: ", response.data)
            setDoc(response.data)
        }catch (error) {
            console.log("error",error)
        }
    }

    useEffect(() =>{
       getDoc();
    },[]);
    
    let show = doc.map((item,index) => <p key={index}>{item.especialidad}</p>);
    return(
        <>
         <h1>Admin</h1>
         {show}
        <p>hola</p>
       </>
    );

}
export default PagAdmin;