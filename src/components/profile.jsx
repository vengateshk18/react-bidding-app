import React, { useEffect, useState } from 'react';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import "./css/profile.css"

function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); // State to hold profile data

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    } else {
      fetchProfileData(token);
    }
  }, []); // Empty dependency array to ensure the effect runs only once

  const fetchProfileData = (token) => {
    fetch('http://localhost:8000/user-details', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      return response.json(); // Return the parsed JSON response
    })
    .then(data => {
      setProfileData(data); // Set profile data in state
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!profileData) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  const imageUrl = `http://localhost:8000${profileData.profile_img}`;
  return (
    <div>
      <Header/>
      <div className="profile">
        <div className='info'>
          <h2><center><h1>Profile Details</h1></center></h2>
          <h4>Profile Picture</h4>
          <img src={imageUrl} alt="profile" width={200} height={100}/>
          <p>Username:{profileData.username}</p>
          <p>Email:{profileData.email}</p>
          <p>Address:{profileData.address}</p>
          <p>Phone Number:{profileData.phoneNumber}</p>
          <div className='center-button'><button onClick={logout} className='logout'>Logout</button></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
