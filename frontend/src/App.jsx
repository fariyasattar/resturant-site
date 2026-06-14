import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Content from './components/Content'
import About from './components/About'
import MenuDisplay from './components/MenuDisplay'
import Gallery from './components/Gallery'
import Service from './components/Service'
import Reservation from './components/Reservation'
import Footer from './components/Footer'


function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo)
        if (element) {
          const yOffset = -80
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  return (
    <>
      <Hero />
      <Content />
      <About />
      <MenuDisplay />
      <Gallery />
      <Service/>
     <Reservation/>
       <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home pe sab sections scroll ke liye */}
        <Route path="/" element={<HomePage />} />

        {/* Alag pages bhi chahiye to ye routes */}
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<MenuDisplay />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/service" element={<Service />} />
        <Route path="/reservation" element={<Reservation />} />
        
      </Routes>
     
    </>
  )
}

export default App