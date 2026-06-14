import React from 'react'
import Line from '../assets/line.png'
import Breakfast from '../assets/food.png'
import Drink from '../assets/drink1.jpg'
import Cake from '../assets/cake.jpg'

const Content = () => {
  return (
    <div id='content' className='bg-white py-10 px-4'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch'>

        {/* Column 1 - Desi Food */}
        <div className='bg-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col'>
          <div className='p-6 flex-1'>
            <img src={Line} alt="" className='mb-2 w-32 mx-auto'/>
            <h2 className='text-[#d4a017] text-center text-2xl font-bold mb-3'>Desi Food</h2>
            <p className='text-center text-sm text-gray-700 leading-relaxed'>
              From sizzling tawa to slow-cooked handi we bring you the true taste of Punjab.
              Relish our signature Lahori Chargha, Nihari, Karahi and freshly baked naan
              straight from the tandoor. Every dish prepared with traditional spices.
            </p>
          </div>
          <div className='aspect-[4/3] bg-white'>
            <img src={Breakfast} alt="" className='w-full h-full object-contain'/>
          </div>
        </div>
    
        {/* Column 2 - Drinks */}
        <div className='bg-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col'>
          <div className='aspect-[4/3] bg-white'>
            <img src={Drink} alt="" className='w-full h-full object-contain'/>
          </div>
          <div className='p-6 flex-1'>
            <img src={Line} alt="" className='mb-2 w-32 mx-auto'/>
            <h2 className='text-[#d4a017] text-center text-2xl font-bold mb-3'>Drinks</h2>
            <p className='text-center text-sm text-gray-700 leading-relaxed'>
              Quench your thirst with traditional Lahori refreshments. From chilled Kashmiri Chai
              and smoky Lassi to our signature Imli Aloo Bukhara Sharbat - every sip tells a story
              of old Lahore. Served in copper glasses.
            </p>
          </div>
        </div>
      
        {/* Column 3 - Appetizers */}
        <div className='bg-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col'>
          <div className='p-6 flex-1'>
            <img src={Line} alt="" className='mb-2 w-32 mx-auto' />
            <h2 className='text-[#d4a017] text-center text-2xl font-bold mb-3'>Appetizers</h2>
            <p className='text-center text-sm text-gray-700 leading-relaxed'>
              Kick off your meal with mouth-watering appetizers. Try our crispy Samosas,
              spicy Chicken Pakoras, Seekh Kebabs grilled to perfection, and creamy
              Dahi Bhallay. Pair them with mint lemonade or lassi.
            </p>
          </div>
          <div className='aspect-[4/3] bg-white'>
            <img src={Cake} alt="" className='w-full h-full object-contain'/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Content