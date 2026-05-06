import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

import Food1 from '../assets/biryani.jpg'
import Food2 from '../assets/Nihari.jpg'
import Food3 from '../assets/chapli_kabab.jpg'
import Food4 from '../assets/Muttonpulao.jpg'
import Food5 from '../assets/mint.jpg'
import Food6 from '../assets/kheer.jpg'
import Food7 from '../assets/rogniNaan.jpeg'
import Food8 from '../assets/ice-cream.jpg'
import Food9 from '../assets/chicken-karahi.png'
import Food10 from '../assets/gajarhalwa.jpg'
import Food11 from '../assets/tandori.jpg'
import Food12 from '../assets/tandooribiryani.png'
import Food13 from '../assets/kabab.jpg'
import Food14 from '../assets/pastries.jpg'


const menuData = [
  { id: 1, name: "Biryani", price: 400, category: "Rice", desc: "Lahori style chicken biryani with special spices", img: Food1 },
  { id: 2, name: "Nihari", price: 600, category: "Beef", desc: "Slow cooked beef shank nihari with naan", img: Food2 },
  { id: 3, name: "Chapli Kabab", price: 350, category: "Kabab", desc: "Authentic Peshawari chapli kabab with chutney", img: Food3 },
  { id: 4, name: "Mutton Pulao", price: 550, category: "Rice", desc: "Yakhni pulao with tender mutton pieces", img: Food4 },
  { id: 5, name: "Mint Margarita", price: 150, category: "Drinks", desc: "Fresh podina drink to beat Lahore heat", img: Food5 },
  { id: 6, name: "Kheer", price: 200, category: "Desserts", desc: "Chawal ki kheer with khoya & dry fruits", img: Food6 },
  { id: 7, name: "Roghni Naan", price: 60, category: "Bread", desc: "Tandoor ka garam rogni naan", img: Food7 },
  { id: 8, name: "Ice Cream", price: 120, category: "Desserts", desc: "Vanilla, chocolate & strawberry flavors", img: Food8 },
  { id: 9, name: "Chicken Karahi", price: 1400, category: "Chicken", desc: "Boneless chicken cooked on high flame with kali mirch", img: Food9 },
  { id: 10, name: "Gajar Halwa", price: 250, category: "Desserts", desc: "Special gajar halwa with khoya", img: Food10 },
  { id: 11, name: "Tandoori Chicken", price: 1400, category: "Chicken", desc: "Tandoori chicken with special masalas", img: Food11 },
  { id: 12, name: "Tandoori Biryani", price: 840, category: "Rice", desc: "Special hyderabadi tandoori biryani", img: Food12 },
  { id: 13, name: "Seekh Kabab", price: 1500, category: "Kabab", desc: "Peshawar special seekh kabab", img: Food13 },
  { id: 14, name: "Pastries", price: 180, category: "Desserts", desc: "Fresh cream & chocolate pastries", img: Food14 },
];

const allCategories = ["All", "Rice", "Beef", "Kabab", "Drinks", "Desserts", "Bread", "Chicken"];

const MenuDisplay = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState(menuData); 
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  
  const handleAddToCart = (item) => {
    const existingItem = cart.find(c => c.id === item.id);
    if (existingItem) {
      setCart(cart.map(c => 
        c.id === item.id ? {...c, qty: c.qty + 1} : c
      ));
    } else {
      setCart([...cart, {...item, qty: 1}]);
    }
  }

const handlePlaceOrder = () => {
  if (cart.length === 0) return alert('Cart empty hai');
  
 
  console.log('Order Data:', {
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    customerName: 'Guest'
  });
  
  alert('Order placed successfully! 🎉');
  setCart([]);
  setShowCart(false);
}

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)
  

    const handleRemoveFromCart = (id) => {
  setCart(cart.filter(item => item.id!== id));
};

const handleUpdateQty = (id, newQty) => {
  if (newQty === 0) {
    handleRemoveFromCart(id);
  } else {
    setCart(cart.map(item =>
      item.id === id? {...item, qty: newQty} : item
    ));
  }
};
  return (
    <div className="bg-black text-white min-h-screen p-8" id='menu'>
      <h1 className="text-4xl text-center font-bold mb-8">Discover Our Menu</h1>
      
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {allCategories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border border-gray-600 
              ${activeCategory === cat ? 'bg-yellow-500 text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => handleAddToCart(item)}
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-900 p-4 rounded-lg"
          >
            <img src={item.img} alt={item.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <div className="flex-1 border-b border-yellow-500 mx-4"></div>
                <span className="text-yellow-500 font-bold">Rs {item.price}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <div 
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 right-4 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold cursor-pointer z-40"
        >
          Cart: {cart.reduce((sum, i) => sum + i.qty, 0)} items - Rs {cart.reduce((sum, i) => sum + i.price * i.qty, 0)}
        </div>
      )}

      {/* Cart Modal */}
     {/* Cart Modal */}
{showCart && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Order</h2>
        <button onClick={() => setShowCart(false)} className="text-2xl">×</button>
      </div>

      {cart.length === 0? (
        <p className="text-gray-400 text-center py-8">Cart empty hai</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="mb-4 pb-4 border-b border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-400">Rs {item.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 text-sm hover:text-red-400"
                >
                  Remove
                </button>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2 bg-gray-800 rounded">
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                    className="px-3 py-1 hover:bg-gray-700 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-2">{item.qty}</span>
                  <button
                    onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 hover:bg-gray-700 rounded-r"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-yellow-500">Rs {item.price * item.qty}</span>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span className="text-yellow-500">Rs {cart.reduce((sum, i) => sum + i.price * i.qty, 0)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-yellow-500 text-black py-3 rounded mt-4 font-bold hover:bg-yellow-400"
          >
            Place Order
          </button>
        </>
      )}

      <button onClick={() => setShowCart(false)} className="w-full bg-gray-700 py-2 rounded mt-2 hover:bg-gray-600">
        Close
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default MenuDisplay