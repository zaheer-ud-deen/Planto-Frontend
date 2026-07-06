import React from 'react'
import Footer from "../components/Footer"

function SucculentsPlants({imageLeft, title, description, image}) {
  return (
    <div className=' bg-[#172218]'>
      <div className="grid md:grid-cols-2 gap-33 items-center max-w-7xl mx-auto px-6 py-10">
        {imageLeft === true ? (
          // iamge left text right
          <>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <img 
                src={image} 
                alt={title}
                className="relative  w-full h-80 object-cover rounded-2xl shadow-2xl border border-emerald-500/30"
              />
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-400">
                {title}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed text-justify">
                {description}
              </p>
            </div>
          </>
        ) : (
          // text left image right
          <>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-400">
                {title}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed text-justify">
                {description}
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <img 
                src={image} 
                alt={title}
                className="relative w-full h-80 object-cover rounded-2xl shadow-2xl border border-emerald-500/30"
              />
            </div>
          </>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default SucculentsPlants