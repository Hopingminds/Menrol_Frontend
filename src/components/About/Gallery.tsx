// Gallery.tsx
import React from 'react';

type GalleryProps = {
    images: string[]; // Array of image URLs
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <section className="p-8 bg-white px-[10%]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h5 className="text-green-600 uppercase font-bold mb-2 font-lexend">/ Our Gallery</h5>
                    <h1 className="text-4xl font-bold text-gray-900 font-lexend">Witness Our service Magic<br /> Explore Now</h1>
                </div>
                <button className="bg-[rgba(0,84,165,1)] text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-blue-700 font-lexend"><a href="ServiceDetails">View All</a></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="bg-[rgba(94,147,198,1)] rounded-md shadow-md h-48 flex items-center justify-center"
                    >
                        <img
                            src={image}
                            alt={`Gallery item ${index + 1}`}
                            className="w-full h-full object-cover rounded-md hover:scale-105 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
