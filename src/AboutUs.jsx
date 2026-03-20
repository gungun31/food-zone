import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AboutUs.css';
import Popup from './Popup';

function AboutUs() {
  const { register, handleSubmit, reset } = useForm();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleContactSubmit = (data) => {
    // Get existing submissions or initialize an empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    
    // Add new submission with a timestamp
    const newSubmission = { ...data, id: Date.now(), date: new Date().toLocaleString() };
    existingSubmissions.push(newSubmission);
    
    // Save back to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
    
    // Show success message and reset form
    setPopupMessage("Thank you for your message! We'll get back to you soon.");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    reset();
  };

  return (
    <div className="about-container">
      <Popup show={showPopup} message={popupMessage} />
      <div className="about-header">
        <h1>About Rasoi Ghar 🥘</h1>
        <p>Bringing the authentic taste of home to your doorstep.</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, Rasoi Ghar started with a simple vision: to bridge the gap between craving home-cooked meals and the convenience of delivery. 
            "Rasoi Ghar" translates to "Kitchen House", symbolizing our commitment to hygiene, warmth, and authentic flavors. 
            We believe that good food is not just about taste, but about the feeling of comfort it brings.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to providing you with the very best of Veg and Non-Veg cuisines, with an emphasis on:
          </p>
          <ul className="mission-list">
            <li><strong>Quality Ingredients:</strong> We source fresh, organic produce daily.</li>
            <li><strong>Hygiene:</strong> Our kitchen follows strict safety and cleanliness protocols.</li>
            <li><strong>Taste:</strong> Authentic recipes passed down through generations.</li>
            <li><strong>Speed:</strong> Hot and fresh delivery under 30 minutes.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Meet the Team</h2>
          <p>
            We are a team of passionate chefs, foodies, and logistics experts working together to ensure your meal is perfect every time.
          </p>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          <form className="contact-form" onSubmit={handleSubmit(handleContactSubmit)}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" {...register("name", { required: true })} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" {...register("email", { required: true })} />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message" rows="5" {...register("message", { required: true })}></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;