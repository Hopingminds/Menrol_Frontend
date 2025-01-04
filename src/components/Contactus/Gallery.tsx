"use client";
import Image from 'next/image';
import React from 'react'

const Gallery = () => {
    const images = [
        '/Images/ServiceImg/Image-1.png',
        '/Images/ServiceImg/Image-2.png',
        '/Images/ServiceImg/Image-3.png',
        '/Images/ServiceImg/Image-4.png',
        '/Images/ServiceImg/Image-5.png',
        '/Images/ServiceImg/Image-6.png',
    ];
    return (
        <div><section className="p-8 bg-white px-[7%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images?.map((image, index) => (
                    <div
                        key={index}
                        className="bg-[rgba(94,147,198,1)] rounded-md shadow-md h-48 flex items-center justify-center hover:scale-105 cursor-pointer"
                    >
                        <Image
                            src={image}
                            alt={`Gallery item ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                            height={100}
                            width={500}
                        />
                    </div>
                ))}
            </div>
        </section></div>
    )
}

export default Gallery