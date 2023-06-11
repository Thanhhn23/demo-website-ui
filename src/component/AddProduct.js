import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import '../App.css';
import { getCookieValue } from "../function/cookie";


function AddProduct({ showAddProduct, closeAddProduct, openAddProduct, setLoadingProductState }) {

  const token = getCookieValue('token');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(showAddProduct);

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsModalOpen(showAddProduct);
  }, [showAddProduct]);

  useEffect(() => {
    if (openAddProduct) {
      setIsModalOpen(true)
    }
  }, [openAddProduct]);


  const handleAddProduct = async () => {
    try {
      const response = await fetch("https://demo-website-api.vercel.app/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          id: id,
          name: name,
          currentPrice: currentPrice,
          pageUrl: pageUrl,
          originalPrice: originalPrice,
          category: category,
          imageUrl: imageUrl
        }),
      });
      const result = await response.json();
      console.log(result);
      setSuccessMessage(true);
      setId('');
      setName('');
      setCurrentPrice(0);
      setOriginalPrice(0);
      setCategory('');
      setImageUrl('');
      setPageUrl('');
      closeModal();
      setLoadingProductState();
      return result;
    }
    catch (e) {
      console.log(e);
      setErrorMessage(true);

    }

  }

  function handleChangeId(e) {
    setId(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeCurPrice(e) {
    setCurrentPrice(e.target.value);
  }

  function handleChangeOriPrice(e) {
    setOriginalPrice(e.target.value);
  }

  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }

  function handleChangeImage(e) {
    setImageUrl(e.target.value);
  }

  function handleChangePage(e) {
    setPageUrl(e.target.value);
  }
  function handleFieldClick() {
    setIsEditable(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    closeAddProduct();

  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="add-product-container">
        <h3 className="add-product-id">Add a product</h3>
        <div>
          <label className="add-product-label">ID </label>
          <input type="text" id="id" value={id} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeId} className="add-product-input" />
        </div>
        <div>
          <label className="add-product-label">Name </label>
          <input type="text" id="name" value={name} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeName} className="add-product-input" />
        </div>
        <div>
          <label className="add-product-label">Current Price </label>
          <input type="number" id="current-price" value={currentPrice} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeCurPrice} className="add-product-input" />
        </div>
        <div>
          <label className="add-product-label">Original Price </label>
          <input type="number" id="original_price" value={originalPrice} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeOriPrice} className="add-product-input" />
        </div>
        <div>
          <label className="add-product-label">Category </label>
          <input type="text" id="category" value={category} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeCategory} className="add-product-input" />
        </div>
        <div>
          <label className="add-product-label">Image URL </label>
          <input type="text" id="image_url" value={imageUrl} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangeImage} className="add-product-input" />
        </div>
        <div>
          <label className="add-product-label">Page URL </label>
          <input type="text" id="page_url" value={pageUrl} readOnly={!isEditable} onClick={handleFieldClick} onChange={handleChangePage} className="add-product-input" />
        </div>
        <button onClick={() => handleAddProduct()} className="add-product-button">Save</button>
        <button onClick={() => closeModal()} className="add-product-button">Close</button>
        {successMessage && <p className="add-product-message">Success</p>}
        {errorMessage && <p className="add-product-message">Invalid data. Please try again</p>}
      </div>
    </Modal>
  )






  // async function post(data) {
  //   const response = await fetch("https://demo-website-api.vercel.app/api/v1/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token
  //     },
  //     body: data,
  //   });

  //   return await response.json();
  // }

  // async function handleUploadImage(image) {
  //   //console.log(image)

  //   const formData = new FormData();
  //   formData.append("image", image);
  //   return fetch("https://demo-website-api.vercel.app/api/v1/upload", {
  //     method: 'POST',
  //     headers:{
  //       Authorization: token
  //     },
  //     body: formData
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       return data.image_url
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });

  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();


  //   try {
  //     const image_url = await handleUploadImage(image);
  //     //console.log(image_url)


  //     const response = await post(JSON.stringify({ id, name, price, originalPrice, image_url }));
  //     //console.log('resspone',response);
  //     setId("");
  //     setName("");
  //     setPrice(0);
  //     setOriginalPrice(0);
  //     setImage([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // return (
  //   <div className="container" style={{ padding: "10px 32px" }}>
  //     <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
  //       <label className="form-label" htmlFor="id">ID</label>
  //       <input
  //         id="id"
  //         type="text"
  //         value={id}
  //         onChange={(event) => setId(event.target.value)}
  //         className="form-input"
  //         required
  //       />

  //       <label className="form-label" htmlFor="name">Name</label>
  //       <input
  //         id="name"
  //         type="text"
  //         value={name}
  //         onChange={(event) => setName(event.target.value)}
  //         className="form-input"
  //         required
  //       />

  //       <label className="form-label" htmlFor="price">Price</label>
  //       <input
  //         id="price"
  //         type="number"
  //         value={price}
  //         onChange={(event) => setPrice(event.target.value)}
  //         min="0"
  //         className="form-input"
  //         required
  //       />
  //       <label className="form-label" htmlFor="original-price">Original Price</label>
  //       <input
  //         id="original-price"
  //         type="number"
  //         value={originalPrice}
  //         onChange={(event) => setOriginalPrice(event.target.value)}
  //         min="0"
  //         className="form-input"
  //         required
  //       />
  //       <label className="form-label" htmlFor="image">Image</label>
  //       <input
  //         id="image"
  //         type="file"
  //         accept="image/*"
  //         onChange={(event) => {
  //           //console.log(event.target.files[0])
  //           setImage(event.target.files[0])
  //           //setImage(image)
  //           //console.log('image', image)
  //         }}

  //         className="form-input"
  //         required
  //       />

  //       <button type="submit" className="form-submit">Add</button>
  //     </form>
  //   </div>
  // );
}

export default AddProduct;
