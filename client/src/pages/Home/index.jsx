import Carousel from "../../components/common/Carousel";
import SectionHeading from "../../components/common/SectionHeading";
import ProductCard from "../../components/product/ProductCard";
import ProductGrid from "../../components/product/ProductGrid";
import usePageMeta from "../../hooks/usePageMeta";
import { getBestSellers, getNewArrivals } from "../../lib/catalog";
import CollectionBanner from "./CollectionBanner";
import Editorial from "./Editorial";
import FeaturedCategories from "./FeaturedCategories";
import Hero from "./Hero";
import NewsletterSection from "./NewsletterSection";
import Philosophy from "./Philosophy";

const newArrivals = getNewArrivals(8);
const trending = getBestSellers(8);

export default function Home() {
  usePageMeta({
    title: "",
    description:
      "Considered everyday clothing for women and men, designed in Dhaka. Free shipping over ৳5,000.",
  });

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <section className="container-page mt-16 lg:mt-24">
        <SectionHeading title="New arrivals" linkTo="/shop/new-arrivals" />
        <ProductGrid products={newArrivals} />
      </section>
      <Editorial />
      <section className="container-page">
        <SectionHeading title="Trending now" linkTo="/shop/best-sellers" />
        <Carousel label="Trending products">
          {trending.map((product) => (
            <div
              key={product.id}
              className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23.5%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </Carousel>
      </section>
      <CollectionBanner />
      <Philosophy />
      <NewsletterSection />
    </>
  );
}
