import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Cart = () => {
  const router = useRouter(); // Initialize the router

  const handleCartClick = () => {
    router.push("/addtocart"); // Navigate to the AddtoCart page
  };

  return (
    <div>
      <div 
        className='bg-blue-500 h-[3rem] rounded-full text-white px-4 py-2 flex items-center ml-2 cursor-pointer' 
        onClick={handleCartClick} // Add onClick handler to navigate
      >
        <FaCartShopping />
      </div>
    </div>
  );
};

export default Cart;
