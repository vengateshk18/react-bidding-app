import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "./css/login.css";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:'',
        password:''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Unknown error occurred.');
            }
        } catch (error) {
            console.log(error);
            setError("An unexpected error occurred.");
        }
    };

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={formData.username} onChange={handleChange} placeholder="Username" name="username"/>
                <br />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password"/>
                <button type="submit">Submit</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Login;
