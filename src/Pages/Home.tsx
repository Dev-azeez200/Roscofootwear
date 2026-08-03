import assets from "../assets/assets";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaHeart, FaRegSmile } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { GiCrossedSabres } from "react-icons/gi";
import { FiTruck } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const categories = [
    {
      title: "Premium Boots",
      image: assets.Cross,
      className: "col-span-12 lg:col-span-6 row-span-2 h-[520px]",
    },
    {
      title: "Contemporary Sneakers",
      image: assets.Cross2,
      className: "col-span-12 lg:col-span-6 h-[250px]",
    },
    {
      title: "Loafers",
      image: assets.Cross3,
      className: "col-span-6 lg:col-span-3 h-[255px]",
    },
    {
      title: "Summer Sandals",
      image: assets.Cross4,
      className: "col-span-6 lg:col-span-3 h-[255px]",
    },
  ];

  const alades = [
    {
      id: 1,
      image: assets.Cross,
      category: "CLASSIC COLLECTION",
      name: "Signature Oxford",
      price: "$285.00",
      favorite: true,
    },
    {
      id: 2,
      image: assets.Cross,
      category: "URBAN LUXURY",
      name: "Avenue Chelsea Boot",
      price: "$340.00",
    },
    {
      id: 3,
      image: assets.Cross,
      category: "ESSENTIALS",
      name: "Urbanite High-Top",
      price: "$195.00",
      badge: "NEW",
    },
    {
      id: 4,
      image: assets.Cross,
      category: "GALA EDITION",
      name: "Velvet Sovereign Loafer",
      price: "$410.00",
    },
  ];

  const features = [
    {
      icon: <MdVerified className="text-xl" />,
      title: "Premium Materials",
      description:
        "We source only the finest full-grain leathers and high-performance textiles from world-class tanneries.",
    },
    {
      icon: <FaRegSmile className="text-xl" />,
      title: "Superior Comfort",
      description:
        "Ergonomic designs and cushioned footbeds ensure all-day comfort without sacrificing an ounce of style.",
    },
    {
      icon: <GiCrossedSabres className="text-xl" />,
      title: "Durable Craftsmanship",
      description:
        "Built to last through traditional construction methods and rigorous quality control testing.",
    },
    {
      icon: <FiTruck className="text-xl" />,
      title: "Nationwide Delivery",
      description:
        "Fast, secure, and tracked shipping across the country, arriving in premium eco-friendly packaging.",
    },
  ];

  const alade = [
    {
      name: "Marquis Monk Strap",
      price: "$210.00",
      image: assets.Cross,
    },
    {
      name: "Ascend Trainer",
      price: "$225.00",
      image: assets.Cross3,
    },
    {
      name: "Nomad Desert Boot",
      price: "$275.00",
      image: assets.Cross4,
    },

    {
      name: "Nomad Desert Boot",
      price: "$275.00",
      image: assets.Cross,
    },
    {
      name: "Nomad Desert Boot",
      price: "$275.00",
      image: assets.Cross2,
    },
  ];

  const images = [
    assets.Cross,
    assets.Cross2,
    assets.Cross3,
    assets.Cross4,
    assets.Cross,
    assets.Cross4,
  ];

  const testimonials = [
    {
      name: "Alade",
      role: "Architect",
      image: assets.Cross3,
      review:
        "The craftsmanship is unlike anything I've seen in recent years. They feel custom-made for my feet, and the leather ages beautifully.",
    },
    {
      name: "Alade",
      role: "Creative Director",
      image: assets.Cross3,
      review:
        "Rosco has become my go-to for both office and weekend wear. The versatility and durability are truly impressive for the price point.",
    },
    {
      name: "Alade",
      role: "Entrepreneur",
      image: assets.Cross3,
      review:
        "The customer service matches the quality of the shoes. From ordering to the premium unboxing experience, every detail is considered.",
    },
  ];

  return (
    <>
      <section
        className="relative h-[90vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.NewBack})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative flex h-full items-center justify-center ">
          <div className=" mx-auto px-6 lg:px-10 lg:mt-25 text-center">
            <h1 className="text-3xl   font-extrabold leading-tight text-white lg:flex lg:justify-center lg:items-center lg:gap-4 lg:text-[60px] md:flex md:justify-center md:gap-2 md:text-3xl">
              Step Into
              <span className="block text-[#D4AF37]">Confidence</span>
            </h1>

            <p className="mt-6  lg:block max-w-2xl mx-auto text-lg md:text-xl leading-8 text-white lg:max-w-[70%]">
              Discover footwear that blends luxury craftsmanship with everyday
              comfort, giving you the confidence to stand out wherever life
              takes you.
            </p>

            <div className="mt-10 flex flex-col lg:flex-row  items-center justify-center gap-5">
              <button className="group bg-white font-semibold text-black px-7 py-3 rounded-xl  shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                Shop Now
              </button>

              <button className="px-7 py-3 rounded-xl border border-white/40 backdrop-blur-md font-semibold bg-white/10 text-white  hover:bg-white hover:text-black transition-all duration-300">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-2 lg:py-20 lg:px-7">
        <div className=" px-4  lg:px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="uppercase text-xs lg:tracking-[3px]  text-black font-semibold">
                Curated Selection
              </p>
              <h2 className=" lg:text-3xl font-semibold mt-2 text-rosco">
                Featured Categories
              </h2>
            </div>

            <Link to="/Collections">
              <button className="text-sm hover:underline flex items-center justify-center hover:bg-rosco py-1 px-3 hover:text-white rounded-xl transition-all duration-300">
                View All Collection
                <IoIosArrowRoundForward className="ml-1 text-lg" />
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-12 lg:grid-rows-2 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${category.className}`}
              >
                <img
                  src={category.image}
                  alt={assets.Cross}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-semibold">{category.title}</h3>

                  <Link to="/Shop">
                    <button className="mt-2 text-sm cursor-pointer font-medium border-b border-white hover:text-rosco hover:border-rosco transition">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="py-10 px-6 lg:py-2 lg:px-11">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[4px] text-xs text-black font-semibold">
              Our Favorites
            </p>

            <h2 className="text-4xl font-semibold mt-2 text-rosco">
              Best Sellers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {alades.map((alade) => (
              <div key={alade.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={alade.image}
                    alt={alade.name}
                    className="w-full h-[260px] md:h-[320px] lg:h-[360px] object-cover transition duration-500 group-hover:scale-105"
                  />

                  {alade.favorite && (
                    <button className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white flex items-center justify-center shadow">
                      <FaHeart size={16} />
                    </button>
                  )}

                  {alade.badge && (
                    <span className="absolute top-4 left-4 bg-black text-white text-[10px] px-2 py-1 rounded-full font-medium">
                      {alade.badge}
                    </span>
                  )}
                </div>

                <div className="text-center mt-5">
                  <p className="text-xs uppercase tracking-widest text-black">
                    {alade.category}
                  </p>

                  <h3 className="font-semibold mt-1">{alade.name}</h3>

                  <p className="text-gray-black mt-1">{alade.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 mt-10">
          <div className=" mx-auto px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {features.map((item, index) => (
                <div key={index}>
                  <div className="mx-auto w-14 h-14 rounded-full bg-rosco text-white shadow flex items-center justify-center mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>

                  <p className="text-black leading-5 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative h-[50vh] lg:h-[75vh]  flex items-center"
        style={{
          backgroundImage: `url(${assets.rosco})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12">
          <div className="max-w-xl text-white">
            <span className="inline-block rounded-full px-4 py-1 text-xs uppercase tracking-[4px] ">
              New Release
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-rosco">
              The Zenith Series
            </h1>

            <p className="mt-5 text-gray-200 leading-7 text-base md:text-lg">
              An exploration of structural minimalism and unparalleled
              durability. Discover the next generation of foot comfort.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-7 py-3 rounded-xl bg-white text-black font-semibold hover:text-white hover:bg-rosco transition-all duration-300">
                Discover Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-6 lg:py-24 lg:px-10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl lg:text-4xl font-semibold text-rosco">
            The Edit
          </h2>

          <div className="flex gap-3">
            <button className="prev-btn w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-rosco hover:text-white transition">
              <FaChevronLeft />
            </button>

            <button className="next-btn w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-rosco hover:text-white transition">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {alade.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group">
                <div className="overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[340px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 text-lg font-medium">{item.name}</h3>

                <p className="text-gray-500">{item.price}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="bg-[#f7f6f4] py-15 lg:px-5">
        <div className=" mx-auto px-6">
          <h2 className="text-2xl text-rosco lg:text-4xl font-semibold text-center mb-14">
            Voices of Excellence
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  <div className="flex gap-1 text-rosco mb-8">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-lg" />
                    ))}
                  </div>

                  <p className="italic text-black leading-6">"{item.review}"</p>
                </div>

                <div className="flex items-center gap-4 mt-10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-black text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-[#f8f8f8]">
        <div className="mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative  ">
            <img
              src={assets.Cross}
              alt="Craftsmanship"
              className="w-full h-[500px] rounded-lg object-cover shadow-lg"
            />

            <div className="absolute -bottom-10 left-55 lg:left-90 -translate-x-1/2 bg-white rounded-lg shadow-xl p-2">
              <img
                src={assets.Cross}
                alt="Rosco Leather"
                className="w-46 h-32 rounded-md object-cover"
              />
            </div>
          </div>

          <div className="max-w-lg">
            <p className="uppercase tracking-[0.35em] text-[15px] text-black mb-5">
              Our Heritage
            </p>

            <h2 className="text-2xl lg:text-3xl font-light leading-tight text-gray-900 mb-8">
              Crafting Legacies, One Step At A Time.
            </h2>

            <p className="text-black leading-8 mb-6">
              Founded on the principles of integrity and elegance, Rosco
              Footwear began in a small workshop with a single mission: to
              create shoes that withstand the test of time while elevating the
              wearer's journey.
            </p>

            <p className="text-black leading-8 mb-10">
              Every pair is the result of hundreds of individual processes, from
              the initial hand-drawn sketch to the final polish. We don't just
              make shoes; we curate the foundation of your confidence.
            </p>

            <button className="group flex flex-col hover:cursor-pointern hover:bg-rosco transition-all duration-300 items-center gap-1 font-semibold text-sm tracking-wide uppercase p-3 rounded-xl hover:text-white ">
              Read Our Full Story
              <span className="w-10 h-[2px] bg-black transition-all duration-300 group-hover:w-16 hover:bg-white"></span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-semibold text-rosco">
              As Seen On You
            </h2>

            <p className="mt-3 text-gray-500 text-lg">
              Follow us
              <span className="font-medium text-black">@RoscoFootwear</span> for
              daily inspiration
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-hidden rounded-lg">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden aspect-[4/5]"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
