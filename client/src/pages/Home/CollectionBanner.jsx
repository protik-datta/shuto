import { Link } from "react-router-dom";
import { COLLECTIONS } from "../../data/collections";
import { editorialImage } from "../../lib/images";

const [featured] = COLLECTIONS;

export default function CollectionBanner() {
  return (
    <section
      aria-labelledby="collection-heading"
      className="container-page mt-16 lg:mt-24"
    >
      <div className="grid bg-ink text-paper md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <h2 id="collection-heading" className="text-h1 font-semibold">
            {featured.label}
          </h2>
          <p className="mt-4 max-w-sm text-paper/75">{featured.blurb}</p>
          <Link
            to={`/shop/${featured.slug}`}
            className="btn btn-light mt-8 self-start"
          >
            Shop the collection
          </Link>
        </div>
        <img
          src={editorialImage("monsoon", 1000, 800)}
          alt="Water-repellent shell jacket and washed cotton layers for the monsoon"
          width="1000"
          height="800"
          loading="lazy"
          className="aspect-[5/4] w-full bg-charcoal object-cover"
        />
      </div>
    </section>
  );
}
