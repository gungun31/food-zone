import React from 'react';
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from './useIntersectionObserver';
import './Home.css';


export default function Home() {

   const navigate = useNavigate();

   // Refs for intersection observer
   const [featuredRef, isFeaturedVisible] = useIntersectionObserver({ threshold: 0.1 });
   const [howItWorksRef, isHowItWorksVisible] = useIntersectionObserver({ threshold: 0.1 });
   const [testimonialsRef, isTestimonialsVisible] = useIntersectionObserver({ threshold: 0.1 });

  const goToMenu = () => {
    navigate("/veg");
  };


  return (
    <>
       <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/food video.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>Welcome to Rasoi Ghar 🥘</h1>
          <p>Your favorite meals, delivered hot and fresh to your doorstep.</p>
          <button className="order-btn" onClick={goToMenu}>Order Now</button>
        </div>
      </section>


      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🌿</div>
          <h3>Fresh Ingredients</h3>
          <p>We use only the freshest ingredients for a healthy and tasty meal.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast Delivery</h3>
          <p>Get your food delivered in under 30 minutes, every single time.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Easy Payment</h3>
          <p>Pay with cash, card, or UPI. Secure and hassle-free payments.</p>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section
        ref={featuredRef}
        className={`featured-dishes fade-in-section ${isFeaturedVisible ? 'is-visible' : ''}`}
      >
        <h2 className="section-title">Our Signature Dishes</h2>
        <div className="dishes-grid">
          <div className="dish-card">
            <img src="PannerButtor.jpg" alt="Paneer Butter Masala" />
            <h4>Paneer Butter Masala</h4>
          </div>
          <div className="dish-card">
            <img src="ChikenBiryani.jpg" alt="Chicken Biryani" />
            <h4>Chicken Biryani</h4>
          </div>
          <div className="dish-card">
            <img src="mshalaDosha.jpg" alt="Masala Dosa" />
            <h4>Masala Dosa</h4>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className={`how-it-works fade-in-section ${isHowItWorksVisible ? 'is-visible' : ''}`}
      >
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Browse Menu</h4>
            <p>Explore our wide range of veg and non-veg dishes.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Place Order</h4>
            <p>Add your favorite items to the cart and checkout.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Enjoy Your Meal</h4>
            <p>Get your food delivered fast and enjoy a delicious meal.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className={`testimonials fade-in-section ${isTestimonialsVisible ? 'is-visible' : ''}`}
      >
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <p>"The best food delivery service in town! The Chicken Biryani was absolutely amazing. Highly recommended."</p>
            <h4>- Anjali S.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Fast delivery and the food was still hot and fresh. The Paneer Butter Masala is a must-try!"</p>
            <h4>- Rohan M.</h4>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
