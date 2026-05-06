import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUsers, FiPhone, FiUser, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: 'Casual Dining'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() ||!formData.phone.trim() ||!formData.date ||!formData.time) {
      setError('Saari fields zaroori hain');
      return;
    }

    if (formData.phone.length!== 11) {
      setError('Phone number 11 digits ka hona chahiye');
      return;
    }

    try {
      const dataToSend = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        guests: parseInt(formData.guests),
        service: 'Dastarkhan Reservation',
        serviceId: 'dastarkhan-table-01'
      };

      console.log('Backend ko ye ja raha hai:', dataToSend);

      const res = await axios.post('http://localhost:5000/api/bookings', dataToSend);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          occasion: 'Casual Dining'
        });
      }, 4000); // 4 second baad reset

    } catch (err) {
      console.error('Backend Error:', err.response?.data);
      setError(err.response?.data?.message || 'Booking fail ho gayi');
    }
  };

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-800 rounded-3xl overflow-hidden min-h-[650px]">

          {/* Left - Form */}
          <div className="bg-gray-900/30 p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.95]">
                BOOK YOUR<br/>
                <span className="text-[#FFB400]">DASTARKHAN</span>
              </h2>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-5 flex items-center gap-2 animate-pulse">
                <FiX /> {error}
              </div>
            )}

            {/* Success Message - YE NAYA ADD KIYA */}
            {submitted && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-4 rounded-xl mb-5 animate-pulse">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <FiCheck className="text-xl" /> Reservation Successful!
                </div>
                <p className="text-sm">
                  Thank you,{formData.name}! Your table has been successfully reserved.
                  We will contact you shortly at {formData.phone} to confirm the details.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={submitted}
                    className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-[#FFB400] focus:outline-none transition-all disabled:opacity-50"
                    required
                  />
                </div>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="03123456789"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={11}
                    disabled={submitted}
                    className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-[#FFB400] focus:outline-none transition-all disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    disabled={submitted}
                    onClick={(e) => e.target.showPicker()}
                    className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-[#FFB400] focus:outline-none transition-all cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:hidden disabled:opacity-50"
                    required
                  />
                </div>
                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={submitted}
                    className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-[#FFB400] focus:outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                    required
                  >
                    <option value="" disabled>Time</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                    <option value="10:00 PM">10:00 PM</option>
                  </select>
                </div>
                <div className="relative">
                  <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    disabled={submitted}
                    className="w-full bg-black border border-gray-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-[#FFB400] focus:outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </div>
              </div>

              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                disabled={submitted}
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-4 text-white focus:border-[#FFB400] focus:outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="Casual Dining">Casual Dining</option>
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Business Dinner">Business Dinner</option>
                <option value="Family Gathering">Family Gathering</option>
              </select>

              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#FFB400] hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {submitted? <><FiCheck /> Table Reserved!</> : 'Confirm Reservation'}
              </button>
            </form>
          </div>

          {/* Right - Live Preview */}
          <div className="relative bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
              <div className="text-right"></div>
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                <p className="text-gray-500 text-xs font-mono mb-2">RESERVATION FOR</p>
                <h3 className="text-3xl font-bold text-white mb-6">
                  {formData.name || 'Your Name'}
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="text-white font-medium">
                      {formData.date || 'Select Date'} • {formData.time || 'Time'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="text-gray-500">Guests</span>
                    <span className="text-white font-medium">{formData.guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Occasion</span>
                    <span className="text-white font-medium">{formData.occasion}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Reservation;