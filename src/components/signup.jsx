import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signup.css'; // Adjust the import path

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    profile_img: null,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === '44ile_img') {
          formDataWithImage.append('profile.profile_img', value, value.name); // Append profile_img to profile object
        } else if (key === 'profile') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formDataWithImage.append(`profile.${subKey}`, subValue);
          });
        } else {
          formDataWithImage.append(key, value);
        }
      });

      const response = await fetch('http://localhost:8000/profiles/', {
        method: 'POST',
        body: formDataWithImage,
      });

      if (!response.ok) {
        throw new Error('Failed to signup');
      }

      navigate("/login");
    } catch (error) {
      console.error('Signup error:', error);
      setResult('An error occurred during signup');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="input-field" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" required />
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="input-field" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Address:
            <textarea name="address" value={formData.address} onChange={handleChange} className="textarea-field" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Profile Image:
            <input type="file" name="profile_img" onChange={handleChange} className="file-field" />
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
      {result && <div className="error-message">{result}</div>}
    </div>
  );
}

export default Signup;
