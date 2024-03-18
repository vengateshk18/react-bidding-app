import Header from "./header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/bidlist.css";

function BidList() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [list, setList] = useState({});
    const [price, setPrice] = useState(0);
    const [flag, setFlag] = useState(false); // State to manage error flag

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate('/login');
        } else {
            fetchList(token);
        }
    }, []);

    const returnHomepage = () => {
        navigate('/dashboard');
    };

    const fetchList = (token) => {
        fetch(`http://localhost:8000/get-list/${itemId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            setList(data);
        })
        .catch(err => {
            console.log('Error', err);
            alert(err);
        });
    };

    const handleChange = (e) => {
        const p = e.target.value;
        setPrice(p);
        setFlag(false);
    };

    const handleSubmit = () => {
        if (price <= list.price) {
            setFlag(true); 
        } else {
        }
    };

    return (
        <div>
            <Header />
            <button className="return-button" onClick={returnHomepage}>Return to Home Page</button>
            <center><h1>{list.product_title} Details</h1></center>
            <div className="product-Info">
                <img src={`http://localhost:8000${list.list_img}`} alt={list.list_img} width={400} height={400} />
                <div className="details">
                    <h1>Product Name: {list.product_title}</h1>
                    <p>Description: {list.description}</p>
                    <h3>Price: {list.price}</h3>
                    <h4>Start Date: {list.start_date ? list.start_date.substring(0, 10) : ''} To End Date: {list.end_date}</h4>
                    <label htmlFor="">Enter the Bid Price:</label>
                    <input type="number" className="input-number" placeholder="$" value={price} onChange={handleChange} />
                    {flag && <p className="error-message">Enter amount greater than the current amount</p>}
                    <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default BidList;
