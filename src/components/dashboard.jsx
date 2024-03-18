import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import './css/dashboard.css'; // Import CSS for styling
import BidList from "./bidList";
function DashBoard() {
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate('/login');
        } else {
            fetchLists(token);
        }
    }, []);

    const fetchLists = (token) => {
        fetch('http://localhost:8000/bid-lists', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            
        })
        .then(res => res.json())
        .then(data => {
            setLists(data);
        })
        .catch(err => {
            console.log('Error', err);
        });
    };
    const handleAddToWatchlist = (productId) => {
        console.log('ProductId:', productId); // Check productId value
        const formData = new FormData();
        formData.append('id', productId);
        fetch('http://localhost:8000/add-to-watchlist', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Product added successfully');
            } else {
                alert('Product already added');
            }
        })
        .catch(err => {
            console.log('Error', err);
        });
    };
    
    
    const handleBid = (productId) => {
       navigate(`/bid/${productId}`)
    };

    return (
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
                                <button onClick={() => handleBid(list.id) }>Bid</button>
                            </div>
                        </div>
                    </div>
                   
                ))}
                <br />
            </div>
        </div>
    );
}

export default DashBoard;
