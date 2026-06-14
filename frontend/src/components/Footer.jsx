import React from 'react';
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiClock, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-900" id='contact'>
      {/* Newsletter Bar */}
      <div className="border-b border-gray-900 ">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center mr-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 ">
                Join The <span className="text-[#FFB400]">Dastarkhan</span> Club
              </h3>
              <p className="text-gray-500 text-sm">Get exclusive deals & event invites. No spam.</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black text-white mb-4">
              LAHORI<br/><span className="text-[#FFB400]">DASTARKHAN</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Authentic taste of Lahore since 1995. Traditional recipes, royal ambiance, unforgettable experience.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:border-[#FFB400] hover:text-[#FFB400] transition-all">
                <FiInstagram />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:border-[#FFB400] hover:text-[#FFB400] transition-all">
                <FiFacebook />
              </a>
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:border-[#FFB400] hover:text-[#FFB400] transition-all">
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-xs tracking-widest">[ EXPLORE ]</h4>
            <ul className="space-y-3 text-sm">
              {[{ name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                 { name: 'Menu', path: '/menu' },
                 { name: 'Gallery', path: '/gallery' },
                 { name: 'Service', path: '/service' },
                 { name: 'Reservation', path: '/reservation' }].map((item) => (
                <li key={item.name}>
                  <a href={item.path} className="text-gray-500 hover:text-[#FFB400] transition-colors">
                 
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-xs tracking-widest">[ CONTACT ]</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 text-gray-500">
                <FiMapPin className="text-[#FFB400] mt-1 flex-shrink-0" />
                <span>MM Alam Road, Gulberg III<br/>Lahore, Pakistan</span>
              </li>
              <li className="flex gap-3 text-gray-500">
                <FiPhone className="text-[#FFB400] mt-1 flex-shrink-0" />
                <span>+92 321 1234567<br/>+92 42 1234567</span>
              </li>
              <li className="flex gap-3 text-gray-500">
                <FiMail className="text-[#FFB400] mt-1 flex-shrink-0" />
                <span>info@lahoridastarkhan.com</span>
              </li>
            </ul>
          </div>

          {/* Timing */}
          <div>
            <h4 className="text-white font-bold mb-6 font-mono text-xs tracking-widest">[ HOURS ]</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-gray-500">
                <span>Mon - Thu</span>
                <span className="text-white">1PM - 12AM</span>
              </li>
              <li className="flex justify-between text-gray-500">
                <span>Fri - Sat</span>
                <span className="text-white">1PM - 1AM</span>
              </li>
              <li className="flex justify-between text-gray-500">
                <span>Sunday</span>
                <span className="text-white">1PM - 12AM</span>
              </li>
              <li className="pt-3 border-t border-gray-900 flex gap-3 text-gray-500">
                <FiClock className="text-[#FFB400] mt-0.5 flex-shrink-0" />
                <span>Kitchen closes 30 mins before</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2026 Lahori Dastarkhan. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FFB400] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#FFB400] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#FFB400] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;