import assets from "../assets/assets";
import { Link } from "react-router-dom";

const Collections = () => {
  const collections = [
    {
      id: 1,
      image: assets.Cross,
      label: "HERITAGE COLLECTION",
      title: "Male Footwear",
      path: "/men",
    },
    {
      id: 2,
      image: assets.womanFoot1,
      label: "AVANT-GARDE COLLECTION",
      title: "Female Footwear",
      path: "/women",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto  px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-black md:text-4xl">
            Our Collections
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[10px] leading-relaxed text-black md:text-xs">
            Discover the epitome of craftsmanship and style. Curated selections
            for every facet of modern life.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative h-100 overflow-hidden rounded-md shadow-sm"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 z-10 text-white">
                <p className="mb-1 text-[7px] font-medium uppercase tracking-wide text-white/80">
                  {collection.label}
                </p>

                <h3 className="text-base font-semibold capitalize leading-none md:text-lg">
                  {collection.title}
                </h3>

                <Link
                  to={collection.path}
                  className="mt-3 inline-block rounded-full border border-white/60 px-4 py-1 text-[8px] font-medium text-white transition-all duration-300 hover:bg-[#D4AF37]"
                >
                  View All
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
