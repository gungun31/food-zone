import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import Popup from './Popup';

function NonVeg() {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const nonVegItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 220,
      image: "ChikenBiryani.jpg"
    },
    {
      id: 2,
      name: "Grilled Chicken",
      price: 250,
      image: "GrilledChiken.jpg"
    },
    {
      id: 3,
      name: "Mutton Curry",
      price: 320,
      image: "MuttonCurry.jpg"
    },
    {
      id: 4,
      name: "Fish Fry",
      price: 280,
      image: "FishCurry.jpg"
    },
    {
    id: 5,
    name: "Prawn Masala",
    price: 300,
    image: "prawn.jpg"
  },
   {
    id: 6,
    name: "Egg Omelette",
    price: 100,
    image: "EggOmlet.jpg"
  },
  {
    id: 7,
    name: "Tandoori Chiken",
    price: 320,
    image: "TanduriChicken.jpg"
  },
   {
    id: 8,
    name: "Butter Chicken",
    price: 350,
    image: "ButtorChicken.jpg"
  },
   {
    id: 9,
    name: "Grilled Salmon",
    price: 450,
    image: "GrilledSalmon.jpg"
  },
   {
    id: 10,
    name: "Mutton Leg",
    price: 480, // per kg
    image: "MuttonLeg.jpg"
  },
   {
    id: 11,
    name: "Crab Meat",
    price: 650, // per kg
    image: "Carb.jpg"
  },
   {
    id: 12,
    name: "Fish Fillet",
    price: 320, // per kg
    image: "FishFillet.jpg"
  },
  {
    id: 13,
    name: "Chicken Tikka",
    price: 280,
    image: "chickenTikka.jpg"
  },
  {
    id: 14,
    name: "Chicken 65",
    price: 240,
    image: "chicken65.jpg"
  },
  {
    id: 15,
    name: "Egg Curry",
    price: 130,
    image: "eggCurry.jpg"
  },
  {
    id: 16,
    name: "Mutton Biryani",
    price: 350,
    image: "muttonBiryani.jpg"
  },
  {
    id: 17,
    name: "Fish Curry",
    price: 300,
    image: "fishCurry.jpg"
  },
  {
    id: 18,
    name: "Prawns Fry",
    price: 320,
    image: "prawnsFry.jpg"
  },
  {
    id: 19,
    name: "Chilli Chicken",
    price: 260,
    image: "chilliChicken.jpg"
  },
  {
    id: 20,
    name: "Keema Pav",
    price: 220,
    image: "keemaPav.jpg"
  },
  {
    id: 21,
    name: "Mutton Rogan Josh",
    price: 380,
    image: "roganJosh.jpg"
  }
  ];

const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setPopupMessage(`${item.name} added to cart`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };


  // Pagenation
  const ItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1); 
  const totalPages = Math.ceil(nonVegItems.length / ItemsPerPage);
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = nonVegItems.slice(indexOfFirstItem, indexOfLastItem);
  


  return (
    <>
      <div className="nonveg-container">
      <h2>🍗 Non-Veg Items</h2>

      <div className="nonveg-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="nonveg-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
<button onClick={() => handleAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active-page" : ""}>
            {index + 1}
          </button>
        ))}
      </div>
      <Popup show={showPopup} message={popupMessage} />
    </div>
    </>
  )
}

export default NonVeg;
