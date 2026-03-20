import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { removeCart, increment, decrement, clearCart } from './redux/cartSlice';
import { applyCoupon } from './redux/couponSlice';
import Popup from './Popup';
import './Cart.css';
import QRCodeLib from 'react-qr-code';
import emailjs from '@emailjs/browser';   // ✅ correct package
import { addOrder } from './redux/OrderSlice';

const QRCode = QRCodeLib.default || QRCodeLib;

function Cart() {

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const totalAmt = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Coupon states
    const [input, setInput] = useState("");
    const { code, discount } = useSelector(state => state.coupon);

    const discountPercentage = (discount || 0);
    const discountAmt = (totalAmt * discountPercentage) / 100;

    const amtAfterDiscount = totalAmt - discountAmt;
    const gst = amtAfterDiscount * 0.18;
    const finalAmt = amtAfterDiscount + gst;

    const coupons = {
        SAVE10: 10,
        SAVE20: 20,
        WELCOME5: 5,
        FESTIVE25: 25,
    };

    const [checkOut, setCheckOut] = useState(false);
    const [payment, setPayment] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [custEmail, setCustEmail] = useState("");

    const handleRemove = (item) => {
        dispatch(removeCart(item));
        setPopupMessage(`${item.name} removed from cart`);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(decrement(item));
        } else {
            handleRemove(item);
        }
    };

    const handleApplyCoupon = () => {
        const couponCode = input.toUpperCase();

        if (coupons[couponCode]) {
            const discountPercentage = coupons[couponCode];
            const discountAmount = (totalAmt * discountPercentage) / 100;

            dispatch(applyCoupon({ code: couponCode, discount: discountPercentage }));

            setPopupMessage(
                `Coupon ${couponCode} Applied! You saved ₹${discountAmount.toFixed(2)}`
            );
            setShowPopup(true);
            setInput("");
        } else {
            setPopupMessage("Invalid Coupon Code");
            setShowPopup(true);
        }

        setTimeout(() => setShowPopup(false), 2000);
    };




    // ✅ Email Checkout Function
    const handleCheckout = () => {

        if (!custEmail) {
            alert("Please enter your email");
            return;
        }

        let purchaseDetails = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            email: custEmail,
            items: [...cartItems],
            total: finalAmt,
        };

        // Dispatch order immediately so it gets stored regardless of email success
        dispatch(addOrder(purchaseDetails));
        dispatch(clearCart());

        const emailParams = {
            order_id: purchaseDetails.id,
            orders: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: (item.price * item.quantity).toFixed(2),
            })),
            cost: {
                shipping: 50,
                tax: gst.toFixed(2),
                total: finalAmt.toFixed(2),
            },
            email: custEmail,
        };

        emailjs.send(
            "service_ilnn977",      // 🔁 your service ID
            "template_j0octv8",      // 🔁 your template ID
            emailParams,
            "v3tSuuTzilJZAdU8k"      // 🔁 your public key
        )
        .then(() => {
            alert("Order placed and email sent successfully!");
        })
        .catch((error) => {
            console.log("Email Error:", error);
            alert("Order placed successfully (Email sending failed)");
        });
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Cart 🛒</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.name} width="80" />
                                <p>{item.name}</p>
                                <p>₹{item.price} x {item.quantity}</p>

                                <button onClick={() => handleDecrement(item)}>-</button>
                                <button onClick={() => dispatch(increment(item))}>+</button>
                                <button onClick={() => handleRemove(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <h3>Total: ₹{totalAmt.toFixed(2)}</h3>
                    <h3>Discount: ₹{discountAmt.toFixed(2)}</h3>
                    <h3>GST: ₹{gst.toFixed(2)}</h3>
                    <h2>Final Amount: ₹{finalAmt.toFixed(2)}</h2>

                    <input
                        type="text"
                        placeholder="Enter Coupon"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>Apply Coupon</button>

                    <br /><br />

                    {/* for qr  */}
                    <button onClick={() => setCheckOut(true)}>checkOut </button>
                    <br /><br />

                    {checkOut && (
                        <div>
                            <h3> Select Payment Method: </h3>
                            <button onClick={() => setPayment('qr')}> Qr Code </button>
                            <button onClick={() => setPayment('card')}> Card </button>
                            {payment === 'qr' && (
                                <div style={{ margin: '20px auto' }}>
                                    <h2> Scan UPI to pay ₹{finalAmt.toFixed(2)}</h2>
                                    <div style={{ background: 'white', padding: '16px', display: 'inline-block', borderRadius: '10px' }}>
                                        <QRCode
                                            size={200}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={`upi://pay?pa=kumarigungunbasia@oksbi&pn=GungunRsoiGhar&am=${finalAmt}&cu=INR`}
                                            viewBox={`0 0 256 256`}
                                        />
                                    </div>
                                </div>
                            )}
                            {payment === 'card' && (
                                <h3 style={{ color: 'red' }}> "This card service is not Available" </h3>
                            )}
                        </div>
                    )}
                    <br /><br />

                    {/*  for emails */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={custEmail}
                        onChange={(e) => setCustEmail(e.target.value)}
                    />

                    <br /><br />

                    <button onClick={handleCheckout}>
                        Checkout & Send Email
                    </button>
                </>
            )}

            <Popup show={showPopup} message={popupMessage} />
        </div>
    );
}

export default Cart;