import React, { useState } from 'react';
import './Offers.css';

const Offers = () => {
    const [copyStatus, setCopyStatus] = useState(null);

    const offers = [
        { code: "SAVE10", discount: 10, title: "Flat 10% Off", desc: "Get 10% off on your order." },
        { code: "SAVE20", discount: 20, title: "Super Saver", desc: "Get 20% off on orders above ₹500." },
        { code: "WELCOME5", discount: 5, title: "Welcome Offer", desc: "Special 5% discount for new users." },
        { code: "FESTIVE25", discount: 25, title: "Festive Sale", desc: "Celebrate with 25% off!" }
    ];

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopyStatus(code);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    return (
        <div className="offers-container">
            <h2>🎉 Exclusive Offers for You!</h2>
            <div className="offers-grid">
                {offers.map((offer, index) => (
                    <div key={index} className="offer-card">
                        <h3>{offer.title}</h3>
                        <h1>{offer.discount}% OFF</h1>
                        <p>{offer.desc}</p>
                        <div className="coupon-row">
                            <span className="code-text">{offer.code}</span>
                            <button 
                                onClick={() => handleCopy(offer.code)} 
                                className={copyStatus === offer.code ? "copied" : ""}
                            >
                                {copyStatus === offer.code ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;