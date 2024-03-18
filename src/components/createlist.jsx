import Header from "./header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import "./css/createlist.css";

function CreateList() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, []);

  const [Listdata, setListData] = useState({
    product_title: "",
    category: "",
    description: "",
    productimg: null,
    price: "",
    end_date: new Date(), // Set default value for end_date
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productimg") {
      // If it's a file input, only store the file in state
      setListData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the selected file
      }));
    } else {
      // For other inputs, update the state as usual
      setListData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // Append each form field to the FormData object
      Object.keys(Listdata).forEach((key) => {
        formData.append(key, Listdata[key]);
      });
      const response = await fetch("http://localhost:8000/add-list", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData, // Send FormData object instead of JSON.stringify(Listdata)
      });
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.log(response);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="create-list-container">
        <h3>Product Details:</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="product">Product name</label>
              <input
                name="product_title"
                type="text"
                value={Listdata.product_title}
                onChange={handleChange}
                placeholder="Product"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={Listdata.category}
                onChange={handleChange}
              >
                <option value="electronics">electronics</option>
                <option value="cloths">cloths</option>
                <option value="homemade items">homemade items</option>
                <option value="vehicles">vehicles</option>
                <option value="others">others</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="productimg">Product Image</label>
              <input
                type="file"
                name="productimg"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                value={Listdata.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={Listdata.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-date">End date</label>
              <input
                type="date"
                name="end_date"
                onChange={handleChange}
                value={Listdata.end_date}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateList;
