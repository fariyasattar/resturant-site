

export default function Hero() {
  return (
    <section className="bg-[#0F0F0F] text-white min-h-[calc(100vh-4rem)] flex items-center justify-center p-6" id="hero">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* EST Badge */}
        <div className="inline-block border border-[#d4a017] px-4 py-1 mb-8">
          <p className="text-[#d4a017] text-xs tracking-[0.2em] font-semibold">
            EST. 2008 · LAHORE, PAKISTAN
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif">
          <span className="block text-4xl md:text-6xl lg:text-7xl text-white font-light leading-tight">
            Taste the Soul of
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl text-[#d4a017] italic mt-2 md:mt-0">
            Pakistan
          </span>
        </h1>

        {/* Urdu Text */}
        <p className="text-2xl md:text-3xl text-gray-200 mt-6 font-light" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
          لاہوری دسترخوان 
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto mt-8 text-gray-300 text-sm md:text-base leading-relaxed">
          Where centuries of culinary heritage meet the warmth of Punjabi
          hospitality. Every dish, a story. Every bite, a memory.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#menu"
            className="w-full sm:w-auto bg-[#d4a017] hover:bg-[#b3833d] text-white px-8 py-3 text-sm font-semibold tracking-wider transition-colors"
          >
            EXPLORE OUR MENU
          </a>
        </div>

      </div>
    </section>
  )
}