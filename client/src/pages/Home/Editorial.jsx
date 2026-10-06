import { Link } from "react-router-dom";
import { editorialImage } from "../../lib/images";

export default function Editorial() {
  return (
    <section
      aria-labelledby="editorial-heading"
      className="container-page grid items-end gap-8 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
    >
      <img
        src={editorialImage("editorial", 1000, 1250)}
        alt="Detail of a washed cotton overshirt worn open over a white tee"
        width="1000"
        height="1250"
        loading="lazy"
        className="aspect-[4/5] w-full bg-sand object-cover lg:col-span-7"
      />
      <div className="lg:col-span-4 lg:col-start-9 lg:pb-6">
        <h2 id="editorial-heading" className="text-h1 font-semibold">
          The new standard
        </h2>
        <p className="mt-4 text-charcoal">
          We work to one rule: if we would not wear it every week, we do not
          make it. That means fewer pieces, heavier cotton, and cuts that sit
          right on the first try.
        </p>
        <Link
          to="/about"
          className="link-underline mt-6 inline-block text-sm font-medium"
        >
          Read our story
        </Link>
      </div>
    </section>
  );
}
