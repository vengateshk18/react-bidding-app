import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function WatchList(){
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')==null){
          navigate("/login")
        }
      },[])
    return(
        <div>
            <Header/><link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            <h1>watchlist</h1>
        </div>
    )
}
export default WatchList;