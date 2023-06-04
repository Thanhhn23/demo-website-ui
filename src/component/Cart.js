import React, { useEffect, useState } from "react";
import { getCookieValue, setCookie } from "../function/cookie";
import Modal from "./Modal";
import '../App.css';


function Cart({ showcart, closeCart, openCart }) {

    //console.log(typeof showcart)

    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(showcart);
    const [loadingCart, setLoadingCart] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
        closeCart();

    };

    useEffect(() => {
        const products = JSON.parse(getCookieValue('cart'));
        setItems(products)
    }, [loadingCart]);

    useEffect(() => {
        setIsModalOpen(showcart);
    }, [showcart]);

    useEffect(() => {
        if (openCart) {
            setIsModalOpen(true)
        }
    }, [openCart]);

    function handleDeleteItem(id) {
        const products = JSON.parse(getCookieValue('cart'));
        const itemIndex = products.findIndex(item => item.id === id);
        //console.log(itemIndex);
        products.splice(itemIndex, 1);
        //console.log(products)
        setCookie('cart', JSON.stringify(products), 365);
        setLoadingCart((prevLoadingCart) => !prevLoadingCart);

    }

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                    {items?.length > 0
                        ?
                        (<div> <h2 className="cart-title">Cart</h2>
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {items.map((item, index)=> (
                                        <tr key={index} >
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td className="delete-button" onClick={() => handleDeleteItem(item.id)}>x</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           
                            </div>
                        )
                        :
                        (
                            <div>No item in Cart</div>
                        )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default Cart;