import React from 'react'
import Foodimg from '../assets/food1.jpg'
import Foodimge from '../assets/food2.jpg'
export default function OurStory() {
  return (
    <section className="bg-[#0f0f0f] text-white py-16 lg:py-24 overflow-hidden" id='about'>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative">
            {/* OUR STORY Badge */}
            <div className="mb-6">
              <p className="text-[#d4a017] text-xs tracking-[0.3em] font-semibold">
                OUR STORY
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="h-[1px] w-8 bg-[#d4a017]"></span>
                <span className="w-1 h-1 rounded-full bg-[#d4a017]"></span>
                <span className="w-2 h-2 border-[#d4a017] rotate-45"></span>
                <span className="w-1 h-1 rounded-full bg-[#d4a017]"></span>
                <span className="h-[1px] w-8 bg-[#d4a017]"></span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Every Flavor<br />Tells a Story
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-10">
              At Lahori Dastarkhan, we bring you the authentic taste of Punjab. 
              From slow-cooked nihari to sizzling karahi, every recipe has been 
              passed down through generations. Our chefs honor centuries of 
              culinary heritage, blending traditional spices with the warmth of 
              Lahori hospitality. This isn't just food, it's a legacy on a plate.
            </p>

            

            
          </div>

          {/* Right Images */}
          <div className="relative">
            {/* Since 1950 Badge */}
            <div className="absolute -top-6 -right-2 lg:-top-10 lg:right-0 z-20">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border border-[#d4a017]/40 flex flex-col items-center justify-center text-[#d4a017] bg-amber-900">
                <p className="text-[8px] tracking-[0.2em]">QUALITY FOOD</p>
                <p className="text-[8px] tracking-[0.2em] mt-0">FRESH ENVIRONMENT</p>
                <div className="my-1">
                  <p className="text-xs">SINCE</p>
                  <p className="text-2xl font-serif">1950</p>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative">
              {/* Main Restaurant Image */}
              <img
                src={Foodimg}
                alt=""
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Chef Image Overlay */}
              <div className="absolute -bottom-8 -left-4 lg:-left-12 w-2/3 lg:w-1/2">
                <div className="relative">
                  <img
                    src={Foodimge}
                    alt=""
                    className="w-full h-64 lg:h-72 object-cover shadow-2xl"
                  />
                  {/* Decorative Pattern */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 opacity-20">
                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#d4a017,#d4a017_2px,transparent_2px,transparent_8px)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}