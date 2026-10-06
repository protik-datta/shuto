import { COMMERCE, SITE } from "../../constants/site";

const POINTS = [
  {
    title: "Natural fibres first",
    text: "Cotton, linen and wool that soften with wear instead of wearing out.",
  },
  {
    title: "Cut in small runs",
    text: "We make fewer pieces per style, so we restock what sells and skip what does not.",
  },
  {
    title: "Easy to return",
    text: `Not right? Send it back within ${COMMERCE.returnWindowDays} days for an exchange or refund.`,
  },
];

export default function Philosophy() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="container-page py-16 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <h2
          id="philosophy-heading"
          className="text-h1 font-semibold lg:col-span-5"
        >
          {SITE.philosophy}
        </h2>
        <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          {POINTS.map(({ title, text }) => (
            <li key={title} className="border-t border-ink pt-4">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-stone">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
