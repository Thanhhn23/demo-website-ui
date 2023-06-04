import React, { useState, useEffect } from "react";
import { getCookieValue } from "../function/cookie";
import Modal from "./Modal";
import '../App.css';

function OrderTable() {

    const token = getCookieValue('token');

    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/orders', {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [])


    function handleClickOrder(id) {
        fetch(`http://localhost:5000/api/v1/orders/${id}`, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                openModal();
                setOrderDetail(data);
            })
    }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Revenue</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ?
                        (
                            orders.map((order, index) => (
                                <tr key={index} onClick={() => handleClickOrder(order.id)}>
                                    <td>{order.id}</td>
                                    <td>{order.customer_id}</td>
                                    <td>{order.total_revenue?.toLocaleString()}</td>
                                    <td>{order.created_date}</td>
                                </tr>
                            ))
                        )
                        :
                        (
                            <tr>
                                <td colSpan="4">No result found</td>
                            </tr>
                        )}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="customer-details">
                    <div>
                        Customer Name: <span className="name">{orderDetail?.customer_name}</span>
                    </div>
                    <div>
                        Order ID: <span className="order">{orderDetail?.order_id}</span>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image URL</th>
                                <th>Link</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail?.product && orderDetail.product.length > 0 ? (
                                orderDetail.product.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.product_id}</td>
                                        <td>{product.product_name}</td>
                                        <td className="currency">{product.product_price?.toLocaleString()}</td>
                                        <td>
                                            <a href={product.product_image} target="_blank" rel="noopener noreferrer">
                                                Image Link
                                            </a>
                                        </td>
                                        <td>
                                            <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                                Product Link
                                            </a>
                                        </td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No result found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="currency">
                        Total revenue: <span>{orderDetail?.revenue?.toLocaleString()}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )

}

export default OrderTable;