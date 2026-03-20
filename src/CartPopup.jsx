import React, { useState } from 'react';
import { useSelector } from "react-redux";

function CartPopup() {
    let cartItem = useSelector((globalState) => globalState.cart);

    let listItems = cartItem.map(item => (
        <li key={item.id}>
            {item.name} - Qty: {item.quantity} - ₹{item.price * item.quantity}
        </li>
    ));

    let totalPrice = cartItem.reduce((total, item) => total + (item.price * item.quantity), 0);

    const [discountPer, setDiscountPer] = useState(0);

        const discountAmt = (totalPrice * discountPer) /  100; 
        const amtAfterDiscount = totalPrice - discountAmt;
        const gst = amtAfterDiscount * 0.18;
        const finalAmt = amtAfterDiscount + gst;

    return (
        <div className="cart-popup">
            <h3>🛒 Your Cart</h3>
            {cartItem.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {listItems}
                    </ul>
                    <div className="cart-total">
                        <strong>Total: ₹{totalPrice}</strong>
                         <button onClick={() => setDiscountPer(10)}> Apply 10% discount </button>
                    <button onClick={() => setDiscountPer(20)}> Apply 20% discount </button>
                    <button onClick={() => setDiscountPer(30)}> Apply 30% discount </button>

                    <h3> Discount Amount: ₹{discountAmt} </h3>
                    <h3> GST Amount: ₹{gst} </h3>
                    <h3> Final Amount: ₹{finalAmt} </h3>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPopup;
