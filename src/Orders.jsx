import React from 'react'
import { useSelector } from 'react-redux';
import './Orders.css';

function Orders() {
    const orders = useSelector(state => state.order) || [];

    return (
        <div className="orders-container">
            <h2 className="orders-title">Your Orders</h2>
            {orders.length === 0 ? (
                <div className="no-orders-message">
                    <p>No orders found.</p>
                    <p>Order some delicious food to see it here!</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <div className="order-header">
                                <h3>Order ID: {order.id}</h3>
                                <span className="order-date">{order.date}</span>
                            </div>
                            <div className="order-body">
                                <h4>Items:</h4>
                                <ul className="order-items-list">
                                    {order.items.map((item, i) => (
                                        <li key={i} className="order-item">
                                            <span className="item-name">{item.name} (x{item.quantity})</span>
                                            <span className="item-price">₹{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="order-footer">
                                <p className="order-total">Total Amount: ₹{order.total}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders;