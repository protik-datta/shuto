import NewsletterForm from "../../components/common/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-sand">
      <div className="container-page grid items-center gap-6 py-14 md:grid-cols-2 lg:py-20">
        <div>
          <h2 id="newsletter-heading" className="text-h1 font-semibold">
            First to know about new drops
          </h2>
          <p className="mt-3 text-stone">
            One email when a new collection lands. No daily offers.
          </p>
        </div>
        <div className="md:max-w-md md:justify-self-end md:w-full">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
