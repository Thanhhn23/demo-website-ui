import React, { useState } from "react";
import { getCookieValue, setCookie } from "../function/cookie";
import Modal from "./Modal";
import EditProduct from "./EditProduct";
import '../Product.css'

function ProductDetail({ product, setLoadingProductState }) {

    function handleAddToCart(product) {
        product = { ...product, quantity: 1 };

        const existingCart = JSON.parse(getCookieValue('cart')) || [];
        const productIndex = existingCart.findIndex(item => item.id === product.id);

        if (productIndex !== -1) {
            existingCart[productIndex].quantity += 1;
        }
        else {
            existingCart.push(product);
        }

        setCookie('cart', JSON.stringify(existingCart), 365);
    }

    const [isEditOpen, setIsEditOpen] = useState(false);



    function handleEditProduct() {
        setIsEditOpen(true);
    }

    function closeEditModal() {
        setIsEditOpen(false);
    }

    function handleDeleteProduct(event, id) {
        event.stopPropagation(); // Prevent the event from propagating to parent elements
        const token = getCookieValue('token');
        fetch(`https://demo-website-api.vercel.app/api/v1/products/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
            .then(res => setLoadingProductState())            
            .catch(e => console.log(e));
    }



    return (
        <div className="product-list">
            <div className="product" key={product.id}>
               
                <div className="product-image">
                <button className="product-delete-button" onClick={(event) => handleDeleteProduct(event, product.id)}>X</button>
                    <a href={product.page_url} target="_blank" rel="noopener noreferrer">
                        <img src={product.image_url} alt={product.name} />                        
                    </a>

                </div>
                <div className="product-detail">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">{product.current_price}</p>
                    <p className="product-org-price">{product.original_price}</p>
                </div>
                <div className="product-buttons">
                    <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                    <button onClick={() => handleEditProduct()}>Edit product</button>
                </div>
            </div>

            {isEditOpen && (
                <Modal
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    children={<EditProduct id={product.id} closeModal={closeEditModal} />}
                ></Modal>
            )}
        </div>
    )



}

export default ProductDetail;