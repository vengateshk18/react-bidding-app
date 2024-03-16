import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function CurrentBid(){
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')==null){
          navigate("/login")
        }
      },[])
    return(
        <div>
            <Header/>
            <h1>Current Bid</h1>

        </div>
    )
}
export default CurrentBid;