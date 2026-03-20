import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import Popup from './Popup';



function Veg() {
  const vegItems = [
    {
      id: 1, name: "Paneer Butter Masala", price: 180,
      image: "PannerButtor.jpg"
    },
    {
      id: 2,
      name: "Veg Biryani",
      price: 150,
      image: "veg-biryani.jpg"
    },
    {
      id: 3,
      name: "Masala Dosa",
      price: 120,
      image: "mshalaDosha.jpg"
    },
    {
      id: 4,
      name: "Chole Bhature",
      price: 140,
      image: "chholeBhtture.jpg"
    },
     { id: 5, name: "Veg Noodles", price: 110, 
      image: "vegNuddles.jpg" 
    },
    { id: 6, name: "Mixed Veg Curry", price: 160, 
      image: "vegMix.jpg"
    },
    { id: 7, name: "Palak Paneer", price: 170, 
    image: "PalakPaneer.jpg" 
  },
    { id: 8, name: "Aloo Gobi", price: 130, 
      image: "GobhiAloo.jpg" 
    },
    { id: 9, name: "Veg Spring Rolls", price: 100, 
      image: "SpringRoll.jpg" 
    },
    { id: 10, name: "Stuffed Paratha", price: 90, 
      image: "Paratha.jpg" 
    },
    { id: 11, name: "Rajma Chawal", price: 120, 
      image: "RajmaCawal.jpg" 
    },
    { id: 12, name: "Idli Sambar", price: 80, 
      image: "idliSambhr.jpg" 
    }
    ,
    { id: 13, name: "Veg Momos", price: 90, 
      image: "momos.jpg" 
    },
    { id: 14, name: "Gobi Manchurian", price: 110, 
      image: "manchurian.jpg" 
    },
    { id: 15, name: "Dal Makhani", price: 160, 
      image: "dalMakhani.jpg" 
    },
    { id: 16, name: "Jeera Rice", price: 100, 
      image: "jeeraRice.jpg" 
    },
    { id: 17, name: "Mushroom Masala", price: 190, 
      image: "mushroom.jpg" 
    },
    { id: 18, name: "Kadhai Paneer", price: 200, 
      image: "kadhaiPaneer.jpg" 
    },
    { 
      id: 19, name: "Veg Pulao", price: 140, 
      image: "vegPulao.jpg" 
    },
    { 
      id: 20, name: "Shahi Paneer", price: 210, 
      image: "shahiPaneer.jpg" 
    },
    { 
      id: 21, name: "Malai Kofta", price: 180, 
      image: "malaiKofta.jpg" 
    }
  ];


// for dispatch form
 let dispatch = useDispatch();

 const [showPopup, setShowPopup] = useState(false);
 const [popupMessage, setPopupMessage] = useState("");

 const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setPopupMessage(`${item.name} added to cart`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
 }


//  For add pages (pagenation)
const ItemsPerPage = 4;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(vegItems.length / ItemsPerPage);
const indexOfLastItem = currentPage * ItemsPerPage;
const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);



    
  return (
    <>
      <div className="veg-container">
      <h2>🌿 Veg Items</h2>

      <div className="veg-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="veg-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
           <button onClick={() => handleAddToCart(item)}>
            AddToCart
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

export default Veg;
