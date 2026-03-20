import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import Popup from './Popup';

function Drinks() {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  
  const drinksData = [
  {
    id: 1,
    name: "Coca Cola",
    category: "Soft Drink",
    price: 60,
    image: "coca.jpg"
  },
  {
    id: 2,
    name: "Orange Juice",
    category: "Juice",
    price: 80,
    image: "orengeJuice.jpg"
  },
  {
    id: 3,
    name: "Latte",
    category: "Coffee",
    price: 120,
    image: "latte.jpg"
  },
  {
    id: 4,
    name: "Green Tea",
    category: "Tea",
    price: 50,
    image: "greenTea.jpg"
  },
  {
    id: 5,
    name: "Lemonade",
    category: "Juice",
    price: 70,
    image: "lemonade.jpg"
  },
  {
    id: 6,
    name: "Iced Tea",
    category: "Tea",
    price: 75,
    image: "iced-tea.jpg"
  },
  {
    id: 7,
    name: "Mango Lassi",
    category: "Lassi",
    price: 90,
    image: "mango-lassi.jpg"
  },
  {
    id: 8,
    name: "Cappuccino",
    category: "Coffee",
    price: 130,
    image: "cappuccino.jpg"
  },
  {
    id: 9,
    name: "Mineral Water",
    category: "Water",
    price: 30,
    image: "water.jpg"
  },
  {
    id: 10,
    name: "Masala Chai",
    category: "Tea",
    price: 40,
    image: "masala-chai.jpg"
  },
  {
    id: 11,
    name: "Pepsi",
    category: "Soft Drink",
    price: 60,
    image: "pepsi.jpg"
  },
  {
    id: 12,
    name: "Strawberry Shake",
    category: "Shake",
    price: 90,
    image: "strawberryShake.jpg"
  },
  {
    id: 13,
    name: "Cold Coffee",
    category: "Coffee",
    price: 110,
    image: "coldCoffee.jpg"
  },
  {
    id: 14,
    name: "Mojito",
    category: "Mocktail",
    price: 120,
    image: "mojito.jpg"
  },
  {
    id: 15,
    name: "Hot Chocolate",
    category: "Hot Drink",
    price: 140,
    image: "hotChocolate.jpg"
  },
  {
    id: 16,
    name: "Fruit Punch",
    category: "Mocktail",
    price: 130,
    image: "fruitPunch.jpg"
  },
  {
    id: 17,
    name: "Sweet Lassi",
    category: "Lassi",
    price: 80,
    image: "sweetLassi.jpg"
  },
  {
    id: 18,
    name: "Espresso",
    category: "Coffee",
    price: 100,
    image: "espresso.jpg"
  },
  {
    id: 19,
    name: "Apple Juice",
    category: "Juice",
    price: 85,
    image: "appleJuice.jpg"
  }
];
 
const handleAddToCart = (item) => {
  dispatch(addToCart(item));
  setPopupMessage(`${item.name} added to cart`);
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 2000);
};

  //  For add pages (pagenation)
  const ItemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(drinksData.length / ItemsPerPage);
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = drinksData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
  <div className="drinks-container">
  <h2 className="drinks-title">Drink Menu</h2>

  <div className="drinks-grid">
    {currentItems.map((drink) => (
      <div key={drink.id} className="drink-card">
        <img src={drink.image} alt={drink.name} className="drink-image" />
        <h3 className="drink-name">{drink.name}</h3>
        <p className="drink-info">Category: {drink.category}</p>
        <p className="drink-info">Price: ₹{drink.price}</p>

        <button
          className="add-btn"
          onClick={() => handleAddToCart(drink)}>
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
export default Drinks;
