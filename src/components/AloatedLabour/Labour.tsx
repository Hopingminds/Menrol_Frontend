import React from 'react'
import Map from '../Map/Map'
import { IoEyeSharp } from "react-icons/io5";
import Image from 'next/image';


const Labour = () => {
  return (
    <div className='px-[7%] py-6 font-sans'>
      <div className='  w-full'>
        <div className=' rounded-xl border p-6 w-full'>
            <div className=''>
                <Map/>
                <div className='bg-[#0054A5] p-3 text-white rounded-xl w-full flex items-center gap-4'><IoEyeSharp className='text-white'/>5 People are reviewing your requests   </div>
            </div>
        </div>
        <div className='p-6 xsm:w-full  xl:w-[60%] md:w-full '>
        <div className=' border rounded-lg shadow-lg p-3 xsm:flex-col flex xsm:gap-5 gap-10 items-center'>
            <div>
            <Image
            src='/Images/banner.png'
            alt=''
            width={500}
            height={500}
            className=' rounded-lg'
            />
            </div>
           <div className=''>
                <p className='font-bold text-2xl xsm:text-base'>CARPET CLEANING</p>
                <p className=' text-lg xsm:text-sm'>Security Service</p>
                <p className='text-gray-400 text-base xsm:text-xs xsm:w-full  w-[80%]'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown </p>
           </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Labour
