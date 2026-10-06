import assets from "../assets/assets";
import {
  FaAward,
  FaEye,
  FaGem,
  FaShoePrints,
  FaPencilRuler,
  FaTools,
} from "react-icons/fa";
import {
  FaCouch,
  FaLightbulb,
  FaHandshake,
  FaRulerCombined,
  FaHammer,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: <FaGem size={20} />,
      title: "PREMIUM MATERIALS",
      description:
        "Full-grain European leather sourced from sustainable LWG-certified tanneries.",
    },
    {
      icon: <FaShoePrints size={20} />,
      title: "COMFORTABLE FIT",
      description:
        "Orthopedic-inspired comfort footbeds that mold to your unique step over time.",
    },
    {
      icon: <FaPencilRuler size={20} />,
      title: "MODERN DESIGNS",
      description:
        "Architectural silhouettes that bridge the gap between classic and contemporary fashion.",
    },
    {
      icon: <FaTools size={20} />,
      title: "DURABLE CRAFT",
      description:
        "Expert craftsmanship with durable construction built to last for years.",
    },
  ];

  const principles = [
    {
      icon: <FaGem />,
      title: "Quality",
      desc: "We never compromise. If it isn't perfect, it isn't ROSCO.",
    },
    {
      icon: <FaCouch />,
      title: "Comfort",
      desc: "Luxury is meaningless if it isn't wearable for a 12-hour day.",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      desc: "Honoring tradition while pioneering technical performance.",
    },
    {
      icon: <FaHandshake />,
      title: "Trust",
      desc: "Building relationships through transparency and care.",
    },
  ];

  const journey = [
    {
      icon: <FaPencilRuler />,
      title: "DESIGN",
      desc: "Conceptual sketching and digital prototyping for weeks.",
    },
    {
      icon: <FaRulerCombined />,
      title: "PATTERNING",
      desc: "Precision cutting of leather to ensure zero waste and a perfect fit.",
    },
    {
      icon: <FaHammer />,
      title: "LASTING",
      desc: "Shaping the leather over the wooden last for 48 hours of curing.",
    },
    {
      icon: <FaBoxOpen />,
      title: "FINISHING",
      desc: "Hand-finishing and rich conditioning for a deep, rich patina.",
    },
    {
      icon: <FaCheckCircle />,
      title: "INSPECTION",
      desc: "A 12-point quality check before final approval and boxing.",
    },
  ];

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
          <div className="max-w-3xl text-white text-center flex flex-col justify-center items-center">
            <h1 className="text-2 xl md:text-6xl font-bold flex gap-3 leading-tight">
              Crafting<span className="block text-[#D4AF37]">Confidence</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-8 max-w-2xl mx-auto">
              At Rosco Footwear, we believe every step tells a story. Our
              mission is to create premium footwear that blends exceptional
              craftsmanship, lasting comfort, and timeless style. Every pair is
              thoughtfully designed to inspire confidence and accompany you
              wherever life takes you.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-10">
              <Link
                to="/collections"
                className="inline-block rounded-xl bg-white px-7 py-3 font-semibold text-black transition-all duration-300 hover:bg-rosco hover:text-white"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F7F3] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-10 transition duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-8">
                <FaAward size={22} />
              </div>

              <h2 className="text-3xl font-bold mb-5 text-black">
                Our Mission
              </h2>

              <p className="text-gray-600 leading-8">
                To empower individuals through footwear that merges
                uncompromising quality with understated luxury. We aim to
                elevate the standard of everyday essentials by providing shoes
                that inspire confidence in every environment.
              </p>
            </div>

            <div className="bg-black rounded-2xl shadow-lg p-10 transition duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-8">
                <FaEye size={22} />
              </div>

              <h2 className="text-3xl font-bold text-[#D4AF37] mb-5">
                Our Vision
              </h2>

              <p className="text-gray-300 leading-8">
                To become the global benchmark for modern craftsmanship, where
                the name ROSCO is synonymous with the perfect blend of form and
                function. We envision a future where luxury is defined by
                durability and intentional design.
              </p>
            </div>
          </div>

          <div className="mt-28">
            <h2 className="text-3xl  font-semibold lg:text-4xl text-center text-rosco mb-20">
              The Rosco Standard
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group text-center cursor-pointer rounded-2xl p-4 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white border border-rosco"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.45 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-white shadow-md flex items-center justify-center text-[#111111] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="mt-6 text-sm font-semibold tracking-[2px] uppercase">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm text-black max-w-55 mx-auto">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#D4AF37] text-center mb-12">
            Principles We Walk By
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-white/10">
            {principles.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center px-8 py-8 transition-all duration-500 hover:bg-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black text-2xl mb-6 transition-all duration-500 group-hover:bg-rosco group-hover:text-white group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-medium text-white mb-3 transition-colors duration-300 tracking-[2px] ">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-5 text-sm max-w-60 transition-colors duration-300 group-hover:text-gray-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F7F3] py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-24 text-rosco">
            The Journey of a Pair
          </h2>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gray-200"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 relative">
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  className="group text-center relative"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, color: "#fff" }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center text-xl bg-white border-gray-300 text-black hover:bg-rosco`}
                  >
                    {step.icon}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                    className="mt-8 font-medium tracking-[2px] text-sm"
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.35 }}
                    className="mt-4 text-sm text-black leading-5"
                  >
                    {step.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative h-[520px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${assets.rosco})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-white font-serif font-bold leading-tight text-3xl md:text-5xl lg:text-7xl">
            Step Into Confidence
            <br />
            with <span className="text-rosco">Rosco Footwear</span>
          </h1>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className="bg-white text-black px-7 py-3 rounded-xl font-semibold shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all">
              Shop Now
            </button>

            <button className="border border-gray-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
