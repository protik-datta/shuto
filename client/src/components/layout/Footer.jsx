import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { COMMERCE, SITE } from "../../constants/site";
import { formatPrice } from "../../utils/format";
import NewsletterForm from "../common/NewsletterForm";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/shop/new-arrivals" },
      { label: "Women", to: "/shop/women" },
      { label: "Men", to: "/shop/men" },
      { label: "Best Sellers", to: "/shop/best-sellers" },
      { label: "Sale", to: "/shop/sale" },
    ],
  },
  {
    title: "Customer care",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Shipping", to: "/faq" },
      { label: "Returns", to: "/faq" },
      { label: "Size guide", to: "/size-guide" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Stores", to: "/contact" },
      { label: "Careers", href: `mailto:${SITE.email}?subject=Careers` },
    ],
  },
];

const SOCIAL = ["Instagram", "Facebook", "Pinterest"];

const TRUST = [
  {
    Icon: Truck,
    text: `Free delivery over ${formatPrice(COMMERCE.freeShippingThreshold)}`,
  },
  { Icon: RotateCcw, text: `${COMMERCE.returnWindowDays}-day easy returns` },
  { Icon: ShieldCheck, text: "bKash, Nagad, cards and cash on delivery" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-stone">{SITE.philosophy}</p>
          <div className="mt-8 max-w-sm">
            <p className="mb-3 text-sm font-semibold">
              Get early access to new drops
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2 className="mb-4 text-sm font-semibold">{title}</h2>
              <ul className="space-y-2.5 text-sm">
                {links.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="link-underline">
                        {label}
                      </Link>
                    ) : (
                      <a href={href} className="link-underline">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <ul className="container-page grid gap-3 py-5 text-sm sm:grid-cols-3">
          {TRUST.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5">
              <Icon size={18} aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-5 text-meta text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; 2026 {SITE.name}. Designed in Dhaka. This is a frontend demo;
            no payments are processed.
          </p>
          <ul className="flex gap-5">
            {SOCIAL.map((name) => (
              <li key={name}>
                <a href="#" className="link-underline hover:text-ink">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
