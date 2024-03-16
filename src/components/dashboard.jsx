import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function DashBoard(){
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')==null){
          navigate("/login")
        }
      },[])
    return(
        <div>
            <Header/>
            <h1>DashBoard</h1>
            <h2>token:{localStorage.getItem('token')}</h2>
        </div>
    )
}
export default DashBoard;