import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/dashboard.css"
function WatchList(){
    const navigate=useNavigate()
    const [lists,setListsData]=useState([])
    useEffect(()=>{
      const token=localStorage.getItem('token')
      if(token==null){
        navigate('/login')
      }
      else{
        fetchwatchList(token)
      }
      },[])
    const fetchwatchList=(token)=>{
      fetch('http://localhost:8000/user-watchlist',{
        method:'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
      }).then(res=>res.json()).then(data=>{
        setListsData(data)
      }).catch(err=>{
        console.log('Error',err)
      })
    }
    const handleDeleteToWatchlist=(id)=>{
      const data=new FormData()
      data.append('id',id)
      fetch('http://localhost:8000/user-watchlist-delete-item',{
        method:'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        body:data
      }).then(res=>res.json()).then(data=>{
         alert(data.message)
         window.location.reload();
      }).catch(err=>{
          alert(data.message)
      })
    }
    return(
        <div>
            <Header/>
            <h1 className="dashboard-title">Watchlist</h1>
            <div className="product-list">
                {lists.map((list) => (
                    <div className="product-card" key={list.id}>
                        <img className="product-image" src={`http://localhost:8000${list.list_img_url}`} alt={list.list_img_url} />
                        <div className="product-details">
                            <h2>{list.product_title}</h2>
                            <p><strong>Category:</strong> {list.category}</p>
                            <p><strong>Description:</strong> {list.description}</p>
                            <p><strong>Price:</strong> ${list.price}</p>
                            <p><strong>Start Date:</strong> {list.start_date.substring(0,10)}</p>
                            <p><strong>End Date:</strong> {list.end_date}</p>
                            <div className="product-actions">
                            <button onClick={() => handleDeleteToWatchlist(list.id)} className="delete-from-watchlist">Delete to Watchlist</button>
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