import React, { useState, useEffect } from "react";
import { getCookieValue } from "../function/cookie";
import Modal from "./Modal";
import '../App.css'

function CustomerTable() {

    const url = "http://localhost:5000/api/v1/customers";
    const token = getCookieValue("token");
    const [listCustomers, setListCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerDetail, setCustomerDetail] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    function handleClickCustomer(id) {
        let finalUrl = url + '/' + id;
        fetch(finalUrl, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => {
                setCustomerDetail(data);
                openModal()
                console.log(data);

            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
            .then(res => res.json())
            .then(data => setListCustomers(data))
            .catch(e => console.log(e))
    }, [])



    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {listCustomers.length > 0 ? 
                    (listCustomers.map((customer, index) => (
                        <tr key={index} onClick={() => handleClickCustomer(customer.id)}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                        </tr>
                    ))):
                    ( <tr>
                        <td colSpan="4">No result found</td>
                    </tr>)}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="customer-details">
                    <div>
                        Name: <span className="name">{customerDetail?.customer_name}</span>
                    </div>
                    <div>
                        Orders: {customerDetail?.order_id?.map((orderId, index) => (
                            <span key={index} className="order">{orderId} </span>
                        ))}
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
                            {customerDetail?.product && customerDetail.product.length > 0 ? (
                                customerDetail.product.map((product, index) => (
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
                    <div>
                        Total revenue: <span className="currency">{customerDetail?.revenue?.toLocaleString()}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CustomerTable;
