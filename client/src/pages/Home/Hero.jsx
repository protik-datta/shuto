import { Link } from "react-router-dom";
import { SITE } from "../../constants/site";
import { assets } from "../../assets/frontend_assets/assets";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grid lg:min-h-[640px] lg:grid-cols-[5fr_7fr]"
    >
      <div className="order-2 flex flex-col justify-center px-4 py-10 sm:px-8 lg:order-1 lg:py-16 lg:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] lg:pr-14">
        <h1 id="hero-heading" className="text-display font-semibold">
          {SITE.tagline}
        </h1>
        <p className="mt-5 max-w-sm text-base text-charcoal">
          Considered basics in cotton, linen and wool. Cut to be worn on repeat,
          made to last past the season.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/shop/women" className="btn btn-primary">
            Shop Women
          </Link>
          <Link to="/shop/men" className="btn btn-outline">
            Shop Men
          </Link>
        </div>
      </div>
      <img
        src={assets.hero_img}
        alt="Two models wearing relaxed cotton and linen pieces from the new season"
        width="1400"
        height="1100"
        fetchpriority="high"
        className="order-1 aspect-[4/3] w-full bg-sand object-cover lg:order-2 lg:aspect-auto lg:h-full"
      />
    </section>
  );
}
