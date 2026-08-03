import assets from "../assets/assets";

const Shop = () => {
  return (
    <div className="bg-[#F8F7F3] min-h-screen">
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={assets.rosco}
          alt="Rosco Footwear"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10  mx-auto h-full px-6 lg:px-10 flex items-center justify-center">
          <div className="flex justify-center items-center flex-col text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight flex gap-4">
              Crafted For
              <span className="block text-[#D4AF37]">Every Journey</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg max-w-200 text-center ">
              Discover premium footwear that blends timeless craftsmanship,
              superior comfort, and sophisticated design to keep you moving in
              style.
            </p>

            <div className="flex gap-5 mt-10">
              {/* <button className="group bg-white font-semibold text-black px-7 py-3 rounded-xl  shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                Shop Now
              </button> */}

              <button className="px-7 py-3 rounded-xl border border-white/40 backdrop-blur-md font-semibold bg-white/10 text-white  hover:bg-white hover:text-black transition-all duration-300">
                View Collection
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
