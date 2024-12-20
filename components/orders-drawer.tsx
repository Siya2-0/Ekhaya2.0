'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

const OrdersDrawer = () => {
    const cartItems = [
        {
          id: 1,
          name: "Premium Whisky",
          category: "Whisky",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
        },
        {
          id: 2,
          name: "Silver Tequila",
          category: "Tequila",
          price: 45.99,
          image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
        },
        {
          id: 3,
          name: "Smooth Vodka",
          category: "Vodka",
          price: 32.99,
          image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b"
        }
      ];
  return (
    <React.Fragment>
      <div className='h-full w-full bg-[#f2f2f2] text-[#212322]'>
        <div className='absolute top-0 w-full md:justify-center md:items-center md:text-center'>
          <h2 className='sm:text-5xl text-4xl font-bold md:mt-8 mt-4 ml-4'>CART</h2>
          {/* <hr className='text-[#898989] md:mt-12'/> */}
        </div>
        
        <div className='absolute w-full top-28 md:bottom-[280px] bottom-[200px] overflow-y-auto'>
          {currentOrders.map(item => (
              <React.Fragment key={item.id}>
                        <div className='mb-2' key={item.id}>
                          <hr />
                          <div className='flex items-center sm:space-x-4 w-full'>
                              <Image src={item.image} alt='' width={100} height={100} className='sm:w-36 sm:h-36'style={{objectFit:"cover"}} unoptimized />
                              <div className='w-full pl-2'>
                                  <p className='font-bold sm:text-2xl text-1xl'>{item.name}</p>
                                  <p className='text-sm'>{item.category}</p>
                                  {/* <p className='text-sm'>Size: {sale.selectedSize}</p> */}
                              </div>
                              <div className='hidden sm:block min-w-[100px]'>
                              <div className="py-2 px-3 inline-block bg-[#f2f2f2]" data-hs-input-number>
                                <div className="flex items-center gap-x-1.5">
                                <button onClick={() => updateQuantity(item.id, "decrement")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                  <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                </button>
                                  <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-black" type="text" value={sale.quantity} data-hs-input-number-input readOnly/>
                                  <button onClick={() =>  updateQuantity(item.id, "increment")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                  </button>
                                </div>
                              </div>
                              </div>
                              <div>
                              <div className='sm:hidden block min-w-[100px]'>
                              <div className="py-2 px-3 inline-block bg-[#f2f2f2]" data-hs-input-number>
                                <div className="flex items-center gap-x-1.5">
                                <button onClick={() => updateQuantity(item.id, "decrement")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                  <span className="relative z-10"><FaMinus className='w-[10px] h-[10px]'/></span>
                                </button>
                                  <input className="p-0 w-4 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-black" type="text" value={sale.quantity} data-hs-input-number-input readOnly/>
                                  <button onClick={() =>  updateQuantity(item.id, "increment")} className="text-red mr-[0px] hover:before:bg-redborder-black relative rounded-full h-[32px] w-[32px] overflow-hidden bg-[#f2f2f2] px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all before:duration-500 hover:text-white hover:shadow-black hover:before:left-0 hover:before:w-full">
                                    <span className="relative z-10"><FaPlus className='w-[10px] h-[10px]'/></span>
                                  </button>
                                </div>
                              </div>
                              </div>
                                <p className='text-center text-2xl font-bold'>{sale.totalAmount}€</p>
                              </div>
                              <div className='md:block hidden pr-0'>
                                <button onClick={() => removeFromOrders(item.id)} className="pl-6 pr-6 h-[128px] bg-[#f2f2f2] w-full text-black right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-black transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-black hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black">
                                  <span className="relative z-10 uppercase">delete</span>
                                </button>
                              </div>
                              <div className='md:hidden block pr-0'>
                                <button onClick={() => removeFromOrders(item.id)} className="pl-6 pr-6 h-[128px] bg-[#f2f2f2] w-full text-black right-0 top-0 relative overflow-hidden bg-[#f2f2f2] text-black transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-black hover:before:w-2/4 hover:before:bg-black hover:after:w-2/4 hover:after:bg-black">
                                    <span className="relative z-10"><RxCross2 className='w-[25px] h-[25px]'/></span>
                                </button>
                              </div>
                          </div>
                          <hr />
                        </div>
              </React.Fragment>
          ))}
        </div>
        <div className='justify-center items-center text-center absolute bottom-0 w-full'>
          <div className='relative md:bottom-[32px] min-h-[76px] md:pt-7 w-[100%] flex space-x-2'>
            <div className='w-full'>
                <p className='text-black text-2xl font-bold'>TOTAL</p>
            </div>
            <div className='w-full'>
            <p className='mr-0 text-[#212322] text-3xl font-normal relative'>R{calculateTotal().total.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={() => setShowOrders(false)} disabled={currentOrders.length === 0} className={`group relative bottom-2 min-h-[66px] md:min-h-[76px] w-[96%] overflow-hidden border ${(cartItems.length === 0) ? "border-[#898989]":"border-[#000000]"} bg-[#f2f2f2] ${(cartItems.length === 0) ? "text-[#898989]":"text-black"} transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 ${(cartItems.length === 0) ? "":"before:bg-[#000000]"} before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 ${(cartItems.length === 0) ? "":"after:bg-[#000000]"} after:duration-500 ${(cartItems.length === 0) ? "":"hover:text-[#ffffff]"} hover:before:h-full hover:after:h-full`}>
            <span className={`top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 ${(cartItems.length === 0) ? "":"before:bg-[#000000]"} before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 ${(cartItems.length === 0) ? "":"after:bg-[#000000]"} after:duration-500 ${(cartItems.length === 0) ? "":"hover:text-[#ffffff]"} group-hover:before:h-full group-hover:after:h-full`}></span>
            <span className={`absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center ${(cartItems.length === 0) ? "group-hover:text-[#898989]":"group-hover:text-[#ffffff]"} text-[18px] font-semibold`}>Continue Shopping</span>
          </button>
          <button disabled={cartItems.length === 0}  className={`group relative bottom-0 min-h-[66px] md:min-h-[86px] w-[100%] overflow-hidden border ${(cartItems.length === 0) ? "border-[#898989]":"border-[#000000]"} ${(cartItems.length === 0) ? "bg-[#898989]":"bg-[#000000]"} text-white transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 ${(cartItems.length === 0) ? "before:bg-[#898989]":"before:bg-[#f2f2f2]"} before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 ${(cartItems.length === 0) ? "after:bg-[#898989]":"after:bg-[#f2f2f2]"} after:duration-500 ${(cartItems.length === 0) ? "hover:text-[#898989]":"hover:text-[#000000]"} hover:before:h-full hover:after:h-full`}>
            <span className={`top-[0] flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 ${(cartItems.length === 0) ? "before:bg-[#898989]":"before:bg-[#f2f2f2]"} before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 ${(cartItems.length === 0) ? "after:bg-[#898989]":"after:bg-[#f2f2f2]"} after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full`}></span>
            <span className={`absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center ${(cartItems.length === 0) ? "group-hover:text-[#ffffff]":"group-hover:text-[#000000]"} text-[18px] font-semibold`}>Order</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OrdersDrawer