import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  
  const handleNavClick = (sectionId, routePath) => {
    setIsOpen(false)

    
    if (routePath === '/service' || routePath === '/reservation') {
    navigate(routePath)
      return
    }

    if (location.pathname === '/') {
       const element = document.getElementById(sectionId)
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    } else {
      
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  const navLinks = [
    { name: 'Home', sectionId: 'hero', to: '/' },
    { name: 'About', sectionId: 'about', to: '/' },
    { name: 'Menu', sectionId: 'menu', to: '/' },
    { name: 'Gallery', sectionId: 'gallery', to: '/' },
    { name: 'Service', sectionId: 'null', to: '/service' },
    { name: 'Reservation', sectionId: 'null', to: '/reservation' },
    { name: 'Contact', sectionId: 'contact', to: '/footer' },
  ]

  return (
    <nav className="bg-[#2a2026] text-white sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-serif">
            <span className="text-[#d4a017]">Lahori</span>
            <span className="text-white italic ml-1">Dastarkhan</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.sectionId, link.to)}
                className="text-gray-200 hover:text-[#d4a017] transition-colors text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
              {isOpen? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.sectionId, link.to)}
                className="block w-full text-left py-2 text-gray-200 hover:text-[#d4a017]"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}