import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <div 
        className='bg-[#0054A5] lg:h-[3rem] lg:w-[3rem] xsm:h-[2rem] xsm:w-[2rem] md:h-[2rem] md:w-[2rem] md:px-2 xsm:px-2 rounded-full text-white lg:px-4 py-2 flex items-center ml-2 cursor-pointer' 
        onClick={handleCartClick} // Add onClick handler to navigate
      >
        <FaCartShopping />
      </div>
    </div>
  );
};

export default Cart;
