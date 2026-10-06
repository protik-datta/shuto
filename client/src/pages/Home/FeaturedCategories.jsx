import { Link } from "react-router-dom";
import p_img5  from "../../assets/frontend_assets/p_img5.png";
import p_img11 from "../../assets/frontend_assets/p_img11.png";
import p_img4  from "../../assets/frontend_assets/p_img4.png";
import p_img2  from "../../assets/frontend_assets/p_img2.png";

const FEATURED = [
  { label: "New Arrivals",  to: "/shop/new-arrivals",    image: p_img5  },
  { label: "Women",         to: "/shop/women",            image: p_img11 },
  { label: "Men",           to: "/shop/men",              image: p_img4  },
  { label: "Essentials",    to: "/shop/core-essentials",  image: p_img2  },
];

export default function FeaturedCategories() {
  return (
    <section
      aria-label="Shop by category"
      className="container-page pt-14 lg:pt-20"
    >
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {FEATURED.map(({ label, to, image }) => (
          <li key={label}>
            <Link to={to} className="group block">
              <div className="overflow-hidden bg-sand">
                <img
                  src={image}
                  alt={label}
                  width="700"
                  height="900"
                  loading="lazy"
                  className="aspect-[7/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <span className="mt-3 block text-sm font-medium">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
