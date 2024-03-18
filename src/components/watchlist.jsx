import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function WatchList(){
    const navigate=useNavigate()
    const [lists,setListsData]=useState([])
    useEffect(()=>{
      const token=localStorage.getItem('token')
      if(token==null){
        navigate('/login')
      }
      else{

      }
      },[])
    const fetchwatchList=(token)=>{
      fetch('',{
        method:'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
      })
    }
    return(
        <div>
            <Header/>
            <h1 className="dashboard-title">DashBoard</h1>
            <div className="product-list">
                {lists.map((list) => (
                    <div className="product-card" key={list.id}>
                        <img className="product-image" src={`http://localhost:8000${list.list_img}`} alt={list.list_img} />
                        <div className="product-details">
                            <h2>{list.product_title}</h2>
                            <p><strong>Category:</strong> {list.category}</p>
                            <p><strong>Description:</strong> {list.description}</p>
                            <p><strong>Price:</strong> ${list.price}</p>
                            <p><strong>Start Date:</strong> {list.start_date.substring(0,10)}</p>
                            <p><strong>End Date:</strong> {list.end_date}</p>
                            <div className="product-actions">
                                <button onClick={() => handleAddToWatchlist(list.id)}>Add to Watchlist</button>
                                <button onClick={() => handleBid(list.id,list.price,list.end_date) }>Bid</button>
                            </div>
                        </div>
                    </div>
                   
                ))}
                <br />
            </div>
        </div>
    )
}
export default WatchList;