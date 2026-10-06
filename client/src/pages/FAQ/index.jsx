import Breadcrumbs from "../../components/common/Breadcrumbs";
import usePageMeta from "../../hooks/usePageMeta";
import { FAQ_GROUPS } from "../../data/faq";

export default function FAQ() {
  usePageMeta({
    title: "FAQ",
    description:
      "Answers on shipping, returns, sizing, payments, orders and product care.",
  });

  return (
    <div className="container-page py-6 lg:py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <h1 className="mt-4 text-h1 font-semibold">Frequently asked questions</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav
          aria-label="FAQ topics"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:sticky lg:top-28 lg:flex-col lg:self-start"
        >
          {FAQ_GROUPS.map(({ id, title }) => (
            <a key={id} href={`#${id}`} className="link-underline">
              {title}
            </a>
          ))}
        </nav>
        <div className="max-w-3xl space-y-12">
          {FAQ_GROUPS.map(({ id, title, items }) => (
            <section
              key={id}
              id={id}
              aria-labelledby={`${id}-heading`}
              className="scroll-mt-28"
            >
              <h2 id={`${id}-heading`} className="mb-2 text-h2 font-semibold">
                {title}
              </h2>
              {items.map(({ q, a }) => (
                <details key={q} className="faq-item border-b border-line py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                    {q}
                    <span
                      aria-hidden="true"
                      className="faq-icon text-xl leading-none transition-transform duration-200"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pt-3 text-charcoal">{a}</p>
                </details>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
