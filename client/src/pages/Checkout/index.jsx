import { useState } from "react";
import { Link } from "react-router-dom";
import CouponForm from "../../components/cart/CouponForm";
import OrderSummary from "../../components/cart/OrderSummary";
import ShippingMethodPicker from "../../components/cart/ShippingMethodPicker";
import OrderConfirmation from "../../components/checkout/OrderConfirmation";
import Field from "../../components/ui/Field";
import EmptyState from "../../components/ui/EmptyState";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";
import { getAccount } from "../../lib/account";
import {
  CHECKOUT_FIELD_ORDER,
  validateCheckout,
} from "../../lib/checkoutValidation";
import { createOrderNumber, saveOrder } from "../../lib/orders";
import { formatPrice } from "../../utils/format";

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on delivery",
    note: "Pay the courier when your order arrives.",
  },
  {
    id: "bkash",
    label: "bKash",
    note: "You would be redirected to bKash to approve the payment.",
  },
  {
    id: "nagad",
    label: "Nagad",
    note: "You would be redirected to Nagad to approve the payment.",
  },
  {
    id: "card",
    label: "Card",
    note: "Demo only. Card details are never stored or sent anywhere.",
  },
];

const sectionTitle = "mb-4 text-lg font-semibold";

export default function Checkout() {
  const { items, totals, shippingMethod, clearCart, removeCoupon } = useCart();
  const { showToast } = useToast();
  const [profile] = useState(() => getAccount().profile);
  const [values, setValues] = useState({
    email: profile.email,
    phone: profile.phone,
    name: profile.name,
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  usePageMeta({
    title: placedOrder ? "Order confirmed" : "Checkout",
    description: "Complete your Shuto order.",
  });

  if (placedOrder) return <OrderConfirmation order={placedOrder} />;

  if (items.length === 0) {
    return (
      <div className="container-page py-12">
        <h1 className="sr-only">Checkout</h1>
        <EmptyState
          title="Your bag is empty"
          text="Add something to your bag before checking out."
          actionLabel="Shop new arrivals"
          actionTo="/shop/new-arrivals"
        />
      </div>
    );
  }

  const setField = (key) => (event) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));
  const setCardField = (key) => (event) =>
    setCard((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateCheckout({
      values,
      paymentMethod,
      card,
      termsAccepted,
    });
    setErrors(found);
    const firstInvalid = CHECKOUT_FIELD_ORDER.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    const order = {
      id: createOrderNumber(),
      placedAt: new Date().toISOString().slice(0, 10),
      status: "Processing",
      items: items.map(({ productId, size, color, quantity }) => ({
        productId,
        size,
        color,
        quantity,
      })),
      shippingMethod,
      payment: PAYMENT_METHODS.find((method) => method.id === paymentMethod)
        .label,
      address: {
        name: values.name.trim(),
        line: values.address.trim(),
        city: values.city.trim(),
        postalCode: values.postalCode.trim(),
        country: values.country,
        phone: values.phone.trim(),
      },
      totals,
    };
    saveOrder(order);
    clearCart();
    removeCoupon();
    setPlacedOrder(order);
    window.scrollTo({ top: 0 });
    showToast("Order placed successfully");
  };

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-h1 font-semibold">Checkout</h1>
      <p className="mt-2 text-sm text-stone">
        Frontend demo: no payment is processed and nothing leaves your browser.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16"
      >
        <div className="space-y-10">
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className={sectionTitle}>
              Contact
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={setField("email")}
                error={errors.email}
              />
              <Field
                id="phone"
                label="Mobile number"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={setField("phone")}
                error={errors.phone}
              />
            </div>
          </section>

          <section aria-labelledby="shipping-heading">
            <h2 id="shipping-heading" className={sectionTitle}>
              Shipping address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Full name"
                autoComplete="name"
                value={values.name}
                onChange={setField("name")}
                error={errors.name}
                className="sm:col-span-2"
              />
              <Field
                id="address"
                label="Street address"
                autoComplete="street-address"
                value={values.address}
                onChange={setField("address")}
                error={errors.address}
                className="sm:col-span-2"
              />
              <Field
                id="city"
                label="City"
                autoComplete="address-level2"
                value={values.city}
                onChange={setField("city")}
                error={errors.city}
              />
              <Field
                id="postalCode"
                label="Postal code"
                inputMode="numeric"
                autoComplete="postal-code"
                value={values.postalCode}
                onChange={setField("postalCode")}
                error={errors.postalCode}
              />
              <Field
                id="country"
                label="Country"
                value={values.country}
                readOnly
                className="sm:col-span-2"
              />
            </div>
          </section>

          <section aria-labelledby="delivery-heading">
            <h2 id="delivery-heading" className="sr-only">
              Delivery method
            </h2>
            <ShippingMethodPicker />
          </section>

          <section aria-labelledby="payment-heading">
            <h2 id="payment-heading" className={sectionTitle}>
              Payment
            </h2>
            <div
              className="space-y-2"
              role="radiogroup"
              aria-labelledby="payment-heading"
            >
              {PAYMENT_METHODS.map(({ id, label, note }) => (
                <label
                  key={id}
                  className="flex cursor-pointer items-start gap-3 border border-line bg-white p-3 text-sm has-[:checked]:border-ink"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={id}
                    checked={paymentMethod === id}
                    onChange={() => setPaymentMethod(id)}
                    className="mt-1 accent-ink"
                  />
                  <span>
                    <span className="font-medium">{label}</span>
                    <span className="block text-meta text-stone">{note}</span>
                  </span>
                </label>
              ))}
            </div>
            {paymentMethod === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  id="cardNumber"
                  label="Card number"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="0000 0000 0000 0000"
                  value={card.number}
                  onChange={setCardField("number")}
                  error={errors.cardNumber}
                  className="sm:col-span-2"
                />
                <Field
                  id="cardExpiry"
                  label="Expiry (MM/YY)"
                  autoComplete="off"
                  placeholder="08/29"
                  value={card.expiry}
                  onChange={setCardField("expiry")}
                  error={errors.cardExpiry}
                />
                <Field
                  id="cardCvc"
                  label="Security code"
                  inputMode="numeric"
                  autoComplete="off"
                  value={card.cvc}
                  onChange={setCardField("cvc")}
                  error={errors.cardCvc}
                />
              </div>
            )}
          </section>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                aria-invalid={Boolean(errors.terms)}
                className="mt-1 h-4 w-4 accent-ink"
              />
              <span>
                I agree to the{" "}
                <Link to="/faq" className="underline">
                  delivery and returns terms
                </Link>
                .
              </span>
            </label>
            {errors.terms && (
              <p role="alert" className="mt-1.5 text-meta text-sale">
                {errors.terms}
              </p>
            )}
          </div>
        </div>

        <aside
          aria-label="Order summary"
          className="space-y-5 self-start border border-line bg-white p-5 lg:sticky lg:top-24"
        >
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="divide-y divide-line">
            {items.map(({ key, product, size, color, quantity, lineTotal }) => (
              <li key={key} className="flex items-center gap-3 py-3 text-sm">
                <img
                  src={product.images[0]}
                  alt=""
                  width="120"
                  height="150"
                  className="aspect-[4/5] w-12 bg-sand object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">
                    {product.name}
                  </span>
                  <span className="text-meta text-stone">
                    {[size !== "One size" && size, color]
                      .filter(Boolean)
                      .join(", ")}{" "}
                    &middot; Qty {quantity}
                  </span>
                </span>
                {formatPrice(lineTotal)}
              </li>
            ))}
          </ul>
          <CouponForm />
          <OrderSummary totals={totals} />
          <button type="submit" className="btn btn-primary h-12 w-full">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}
