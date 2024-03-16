import React from 'react';
import "./css/frontpage.css"
import { useNavigate } from 'react-router-dom';

function FrontPage() {
    const navigate = useNavigate();

    function signup() {
        navigate("/signup");
    }

    function login() {
        navigate("/login");
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to Bidding App</h1>
                <p>Start your bidding journey now!</p>
                <div className="Buttons">
                    <button className="LoginButton" onClick={signup}>Signup</button>
                    <button className="SignupButton" onClick={login}>Login</button>
                </div>
                <div className="Info">
                    <h2>Bidding on Older Products</h2>
                    <p>Explore our collection of older products and place your bids!</p>
                    <p>Get great deals on unique items that have stood the test of time.</p>
                </div>
            </header>
        </div>
    );
}

export default FrontPage;
