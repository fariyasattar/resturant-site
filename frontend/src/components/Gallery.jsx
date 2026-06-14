import React from 'react';

const galleryData = [
  { id: 1, img: `${import.meta.env.BASE_URL}gallery/gallery1.jpg`, alt: "Restaurant Interior" },
  { id: 2, img: `${import.meta.env.BASE_URL}gallery/gallery2.jpg`, alt: "Friends Dining" },
  { id: 3, img: `${import.meta.env.BASE_URL}gallery/gallery7.png`, alt: "Restaurant Ambiance" },
  { id: 4, img: `${import.meta.env.BASE_URL}gallery/gallery8.jpg`, alt: "Restaurant Decor" },
  { id: 5, img: `${import.meta.env.BASE_URL}gallery/gallery9.jpg`, alt: "Delicious Food" },
  { id: 6, img: `${import.meta.env.BASE_URL}gallery/gallery6.jpg`, alt: "Special Dish" },
];

const Gallery = () => {
  return (
    <section className="bg-[white] py-20 px-4" id='gallery'>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#FFB400] text-sm font-semibold tracking-[0.3em] uppercase">
            Photo Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mt-3">
            Captured <span className="text-[#FFB400]">Moments</span>
          </h2>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleryData.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white p-4 pb-10 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl
                ${index % 2 === 0? 'rotate-2' : '-rotate-2'} hover:rotate-0`}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-60 object-cover"
              />
              <p className="text-center mt-4 text-gray-700 font-handwriting text-lg">
                {item.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;