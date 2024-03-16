import React from 'react';
import { Link } from 'react-router-dom';
import "./css/navbar.css"

function Header(){
    return(
        <header>
            <nav>
                <li><Link to="/dashboard">DashBoard</Link></li>
                <li><Link to="/watchlist">WatchList</Link></li>
                <li><Link to="/createlist">CreateList</Link></li>
                <li><Link to="/currentbid">CurrentBid</Link></li>
                <li><Link to="/category">Category</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </nav>
        </header>
    )
}
export default Header;