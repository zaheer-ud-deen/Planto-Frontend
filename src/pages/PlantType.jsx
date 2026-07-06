export default function PlantType() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#172218] to-[#0f1810] py-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Animated Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Plant Types
            </h1>
            <p className="text-white/60 text-lg">Discover the perfect plant for your space</p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Succulents */}
            <div className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50 overflow-hidden">
              {/* Decorative background icon */}
              <div className="absolute -top-10 -right-10 text-8xl opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                🌵
              </div>
              
              {/* Card number badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white font-bold text-xl mb-6 shadow-lg shadow-green-500/30">
                1
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                Succulents
                <span className="text-2xl">🌵</span>
              </h2>
              
              <div className="space-y-3 text-white/70">
                <p className="flex items-start gap-2">
                  <span className="text-green-400 text-lg">💧</span>
                  Store water in leaves (low maintenance)
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 text-lg">🌿</span>
                  Examples: Aloe Vera, Jade Plant, Echeveria
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 text-lg">⭐</span>
                  Best for: Beginners, offices, small spaces
                </p>
              </div>
              
              <button className="mt-6 w-full py-2 rounded-xl border border-white/20 text-white/80 text-sm hover:bg-green-500 hover:border-green-500 transition-all duration-300">
                Explore Succulents →
              </button>
            </div>

            {/* Card 2 - Flowering Plants */}
            <div className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:border-pink-500/50 overflow-hidden">
              <div className="absolute -top-10 -right-10 text-8xl opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                🌸
              </div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white font-bold text-xl mb-6 shadow-lg shadow-green-500/30">
                2
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                Flowering Plants
                <span className="text-2xl">🌸</span>
              </h2>
              
              <div className="space-y-3 text-white/70">
                <p className="flex items-start gap-2">
                  <span className="text-green-400 text-lg">🌺</span>
                  Produce colorful blooms
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 text-lg">🌹</span>
                  Examples: Roses, Peace Lily, Orchids
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 text-lg">🎁</span>
                  Best for: Decoration, gardens, gifting
                </p>
              </div>
              
              <button className="mt-6 w-full py-2 rounded-xl border border-white/20 text-white/80 text-sm hover:bg-green-500 hover:border-green-500 transition-all duration-300">
                Explore Flowering Plants →
              </button>
            </div>

            {/* Card 3 - Foliage Plants */}
            <div className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 rounded-3xl p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/50 overflow-hidden">
              <div className="absolute -top-10 -right-10 text-8xl opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                🍃
              </div>
              
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 text-white font-bold text-xl mb-6 shadow-lg shadow-emerald-500/30">
                3
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                Foliage Plants
                <span className="text-2xl">🍃</span>
              </h2>
              
              <div className="space-y-3 text-white/70">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 text-lg">🌿</span>
                  Grown for beautiful leaves, not flowers
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 text-lg">🍃</span>
                  Examples: Calathea, Snake Plant, Monstera
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 text-lg">🏠</span>
                  Best for: Air purification, home decor, humidity
                </p>
              </div>
              
              <button className="mt-6 w-full py-2 rounded-xl border border-white/20 text-white/80 text-sm hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300">
                Explore Foliage Plants →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}