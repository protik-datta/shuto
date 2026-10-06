import { Link } from "react-router-dom";
import usePageMeta from "../../hooks/usePageMeta";
import { editorialImage } from "../../lib/images";

const MATERIALS = [
  {
    name: "Cotton",
    text: "Combed and garment-dyed for a dense, soft hand that does not go thin.",
  },
  {
    name: "Linen",
    text: "Washed before cutting, so it arrives relaxed and keeps its size.",
  },
  {
    name: "Wool",
    text: "Merino and lambswool blends, chosen for warmth without itch.",
  },
  {
    name: "Denim",
    text: "Rigid and washed denim in 11 to 12oz weights that age with you.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    text: "Three styles, one rented studio in Banani, and a rule to only make what we would wear ourselves.",
  },
  {
    year: "2023",
    text: "A denim line cut around the fit most customers asked us for: straight, with room.",
  },
  {
    year: "2025",
    text: "The first Winter Wool range, made for the few cold weeks Dhaka gets.",
  },
  {
    year: "2026",
    text: "Refitted our core tees and shirts after a year of wearer feedback.",
  },
];

export default function About() {
  usePageMeta({
    title: "About",
    description:
      "Shuto is a Dhaka clothing label making a small range of everyday pieces in cotton, linen and wool.",
  });

  return (
    <div>
      <section className="container-page grid items-end gap-8 py-10 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <h1 className="text-display font-semibold">
            Made to be worn, again and again.
          </h1>
          <p className="mt-5 max-w-md text-base text-charcoal">
            Shuto means thread. It is also how we work: one thread at a time,
            from fabric to fit, for pieces that stay in your wardrobe.
          </p>
        </div>
        <img
          src={editorialImage("about", 1100, 900)}
          alt="Cutting table in the Shuto studio with folded cotton and linen"
          width="1100"
          height="900"
          fetchpriority="high"
          className="aspect-[11/9] w-full bg-sand object-cover lg:col-span-7"
        />
      </section>

      <section
        aria-labelledby="mission-heading"
        className="container-page grid gap-6 py-12 lg:grid-cols-12 lg:py-20"
      >
        <h2
          id="mission-heading"
          className="text-h1 font-semibold lg:col-span-4"
        >
          What we are trying to do
        </h2>
        <div className="space-y-4 text-charcoal lg:col-span-6 lg:col-start-6">
          <p>
            Make a small range of clothes that fit properly, feel good in the
            heat, and hold up after fifty washes.
          </p>
          <p>
            We release fewer styles than most labels and restock the ones that
            sell. A piece only stays in the range if people keep buying it a
            second time.
          </p>
        </div>
      </section>

      <section aria-labelledby="materials-heading" className="bg-sand">
        <div className="container-page py-12 lg:py-20">
          <h2 id="materials-heading" className="text-h1 font-semibold">
            Materials
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIALS.map(({ name, text }) => (
              <li key={name} className="border-t border-ink pt-4">
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm text-charcoal">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="craft-heading"
        className="container-page grid items-center gap-10 py-12 lg:grid-cols-12 lg:py-20"
      >
        <img
          src={editorialImage("craft", 900, 1100)}
          alt="Close view of a seam being finished on a cotton shirt"
          width="900"
          height="1100"
          loading="lazy"
          className="aspect-[9/11] w-full bg-sand object-cover lg:col-span-5"
        />
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="craft-heading" className="text-h1 font-semibold">
            Craftsmanship
          </h2>
          <p className="mt-4 text-charcoal">
            Every style is sampled several times before it goes on sale. We
            check fit on different body types, wash-test the fabric, and rework
            seams until they sit flat.
          </p>
          <p className="mt-4 text-charcoal">
            Our garments are cut and sewn in workshops around Dhaka and Gazipur,
            close enough for us to visit often.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="story-heading"
        className="container-page py-8 lg:py-12"
      >
        <h2 id="story-heading" className="text-h1 font-semibold">
          How we got here
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map(({ year, text }) => (
            <li key={year} className="border-t border-line pt-4">
              <p className="text-h2 font-semibold">{year}</p>
              <p className="mt-2 text-sm text-charcoal">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="care-heading"
        className="container-page py-12 lg:py-20"
      >
        <div className="max-w-2xl">
          <h2 id="care-heading" className="text-h1 font-semibold">
            Making less, on purpose
          </h2>
          <p className="mt-4 text-charcoal">
            Small production runs mean less unsold stock. We repair loose seams
            and buttons on our own pieces for free, and fabric offcuts go to
            local workshops for reuse.
          </p>
          <Link to="/shop/new-arrivals" className="btn btn-primary mt-8">
            Shop new arrivals
          </Link>
        </div>
      </section>
    </div>
  );
}
