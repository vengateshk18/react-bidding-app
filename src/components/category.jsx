import Header from "./header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Category() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token === null) {
            navigate('/login');
        } else {
            fetchCategory(token);
        }
    }, []);

    const fetchCategory = (token) => {
        fetch('http://localhost:8000/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setCategories(data);
        })
        .catch(err => {
            console.log('Error', err);
        });
    }

    return (
        <div>
            <Header />
            <h1>Categories</h1>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category.category}</li>
                ))}
            </ul>
        </div>
    );
}

export default Category;
