import React, { useState } from "react";
import '../App.css'
import { getCookieValue } from "../function/cookie";


function AddProduct() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0)
  const [image, setImage] = useState([])
  const token = getCookieValue("token");

  async function post(data) {
    const response = await fetch("http://localhost:5000/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: data,
    });

    return await response.json();
  }

  async function handleUploadImage(image) {
    //console.log(image)

    const formData = new FormData();
    formData.append("image", image);
    return fetch("http://localhost:5000/api/v1/upload", {
      method: 'POST',
      headers:{
        Authorization: token
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        return data.image_url
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const image_url = await handleUploadImage(image);
      //console.log(image_url)


      const response = await post(JSON.stringify({ id, name, price, originalPrice, image_url }));
      //console.log('resspone',response);
      setId("");
      setName("");
      setPrice(0);
      setOriginalPrice(0);
      setImage([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ padding: "10px 32px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label className="form-label" htmlFor="id">ID</label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
          className="form-input"
          required
        />

        <label className="form-label" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="form-input"
          required
        />

        <label className="form-label" htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          min="0"
          className="form-input"
          required
        />
        <label className="form-label" htmlFor="original-price">Original Price</label>
        <input
          id="original-price"
          type="number"
          value={originalPrice}
          onChange={(event) => setOriginalPrice(event.target.value)}
          min="0"
          className="form-input"
          required
        />
        <label className="form-label" htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            //console.log(event.target.files[0])
            setImage(event.target.files[0])
            //setImage(image)
            //console.log('image', image)
          }}

          className="form-input"
          required
        />

        <button type="submit" className="form-submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
