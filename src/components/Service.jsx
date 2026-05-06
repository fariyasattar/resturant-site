import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const servicesData = [
  {
    id: "01",
    title: "Royal Dine-In",
    desc: "Traditional takht seating with clay pot specialties. Live Qawwali every Friday night creates authentic old Lahore atmosphere.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    meta: "120 Guests | Takht Setup"
  },
  {
    id: "02",
    title: "Express Delivery",
    desc: "45-minute hot delivery in DHA, Gulberg & Model Town. Premium insulation keeps karahi sizzling at your doorstep.",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    meta: "Free Above Rs. 2000"
  },
  {
    id: "03",
    title: "Live BBQ Station",
    desc: "Our master chef grills seekh kebab & tandoor naan live at your venue. Adds theatrical experience to events.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    meta: "Chef + Full Setup"
  },
  {
    id: "04",
    title: "Event Catering",
    desc: "Complete Dastarkhan from 50 to 5000 guests. Custom menus for weddings, corporate events & private parties.",
    img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80",
    meta: "Menu Design Included"
  },
];

// Zod Schema - Pro Validation
const bookingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().regex(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
  guests: z.string().min(1, 'Please select number of guests').refine(val => parseInt(val) > 0, 'Guests 1 se zyada hone chahiye'),
  date: z.string().min(1, 'Please select a date').refine(val => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(val);
    return selected >= today;
  }, 'Past dates cannot be selected')
});

const Services = () => {
  const [activeService, setActiveService] = useState(servicesData[0]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateInputRef = useRef(null);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      guests: '',
      date: ''
    }
  });

  const handleBookClick = () => {
    setShowModal(true);
    reset();
  };

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Backend API call - Ab full URL ke saath
      const response = await axios.post(`${API_URL}/api/bookings`, {
        service: activeService.title,
        serviceId: activeService.id,
        ...data
      });

      toast.success('Booking confirmed! We will contact you shortly');
      console.log('Booking Saved:', response.data);
      reset();
      setShowModal(false);
    } catch (error) {
      console.log('Full Error:', error);
      console.log('Error Response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Booking failed. Please try again');
      console.error('Booking Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1f2937', color: '#fff' }
      }} />
      
      <section className="bg-black h-screen w-full overflow-hidden">
        <div className="h-full max-w-8xl mx-auto flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-1/2 md:h-full border-r border-gray-900 p-8 md:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] mb-12">
                THE<br/>
                <span className="text-[#FFB400]">DASTARKHAN</span><br/>
                EXPERIENCE
              </h2>
            </div>

            <div className="space-y-1">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service)}
                  className={`group cursor-pointer border-b border-gray-900 py-5 transition-all duration-300 ${
                    activeService.id === service.id? 'border-[#FFB400]' : 'hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className={`font-mono text-sm transition-all duration-300 ${
                        activeService.id === service.id? 'text-[#FFB400]' : 'text-gray-600'
                      }`}>
                        {service.id}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-bold transition-all duration-300 ${
                        activeService.id === service.id? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      activeService.id === service.id
                  ? 'border-[#FFB400] bg-[#FFB400]'
                      : 'border-gray-800 group-hover:border-gray-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        activeService.id === service.id? 'bg-black' : 'bg-gray-600'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
            <div className="absolute inset-0 transition-all duration-700">
              <img
                src={activeService.img}
                alt={activeService.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
            </div>

            <div className="relative z-10 h-full p-8 md:p-16 flex flex-col justify-end">
              <div className="mb-8">
                <span className="text-[#FFB400] text-xs font-mono tracking-widest uppercase border border-[#FFB400]/30 px-4 py-2 rounded-full">
                  {activeService.meta}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {activeService.title}
              </h3>

              <p className="text-gray-400 leading-relaxed max-w-md mb-8">
                {activeService.desc}
              </p>

              <button
                onClick={handleBookClick}
                className="w-fit bg-[#FFB400] text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-500 transition-all duration-300"
              >
                Book This Service
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full relative border border-[#FFB400]/30">
              <button
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold disabled:opacity-50"
              >
                ×
              </button>

              <h3 className="text-3xl font-bold text-white mb-2">
                Book <span className="text-[#FFB400]">{activeService.title}</span>
              </h3>
              <p className="text-gray-500 mb-6 text-sm">{activeService.meta}</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your Name *"
                    disabled={isSubmitting}
                    className={`w-full bg-black border rounded-lg px-4 py-3 text-white outline-none disabled:opacity-50 ${
                      errors.name? 'border-red-500' : 'border-gray-800 focus:border-[#FFB400]'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone Number * 11 digits"
                    maxLength="11"
                    disabled={isSubmitting}
                    className={`w-full bg-black border rounded-lg px-4 py-3 text-white outline-none disabled:opacity-50 ${
                      errors.phone? 'border-red-500' : 'border-gray-800 focus:border-[#FFB400]'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <input
                    {...register('guests')}
                    type="number"
                    placeholder="Number of Guests *"
                    min="1"
                    disabled={isSubmitting}
                    className={`w-full bg-black border rounded-lg px-4 py-3 text-white outline-none disabled:opacity-50 ${
                      errors.guests? 'border-red-500' : 'border-gray-800 focus:border-[#FFB400]'
                    }`}
                  />
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
                </div>

                <div className="relative">
                 <input
              {...register('date')}
             ref={(e) => {
              register('date').ref(e);
              dateInputRef.current = e;
                    }}
              type="date"
               min={getTodayDate()} 
                    disabled={isSubmitting}
                 className={`w-full bg-black border rounded-lg px-4 py-3 text-white outline-none cursor-pointer disabled:opacity-50 ${
                      errors.date? 'border-red-500' : 'border-gray-800 focus:border-[#FFB400]'
                     }`}
                  />
                  <div
                    onClick={openDatePicker}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#FFB400]"
                  >
                    📅
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFB400] text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Booking...
                    </>
                  ) : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Services;