import { COMMERCE } from "../constants/site";
import { formatPrice } from "../utils/format";

export const FAQ_GROUPS = [
  {
    id: "shipping",
    title: "Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Inside Dhaka we deliver in 1 to 2 working days. Outside Dhaka it takes 3 to 5 working days. Express delivery is available at checkout.",
      },
      {
        q: "How much does delivery cost?",
        a: `Standard delivery is ${formatPrice(COMMERCE.standardShippingFee)} and express is ${formatPrice(COMMERCE.expressShippingFee)}. Standard delivery is free on orders over ${formatPrice(COMMERCE.freeShippingThreshold)}.`,
      },
      {
        q: "Do you deliver outside Bangladesh?",
        a: "Not yet. We currently deliver within Bangladesh only.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    items: [
      {
        q: "What is your returns policy?",
        a: `You can return unworn items with their tags attached within ${COMMERCE.returnWindowDays} days of delivery, for an exchange or a refund.`,
      },
      {
        q: "How do I start a return?",
        a: "Email us your order number and the items you want to send back. We will arrange a pickup within Dhaka, or share a drop-off address elsewhere.",
      },
      {
        q: "When will I get my refund?",
        a: "Refunds go back to your original payment method within 5 to 7 working days after we receive the parcel.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Sizing",
    items: [
      {
        q: "How do your sizes fit?",
        a: "Most tops are cut relaxed and true to size. If you prefer a closer fit, take one size down. Each product page lists fit notes, and our size guide has full measurements.",
      },
      {
        q: "I am between two sizes. Which should I choose?",
        a: "For knitwear and jeans, choose the larger size. For tees and shirts, choose the size that matches your chest measurement.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    items: [
      {
        q: "Which payment methods do you accept?",
        a: "Cash on delivery, bKash, Nagad, and Visa or Mastercard cards.",
      },
      {
        q: "Is cash on delivery available everywhere?",
        a: "Yes, across all areas we deliver to. Please keep the exact amount ready for the courier.",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    items: [
      {
        q: "Can I change or cancel my order?",
        a: "You can change or cancel an order while its status is Processing. Email us as soon as possible with your order number.",
      },
      {
        q: "How do I track my order?",
        a: "Open Orders in your account to see the status and tracking code once your parcel has shipped.",
      },
    ],
  },
  {
    id: "care",
    title: "Product care",
    items: [
      {
        q: "How should I wash garment-dyed pieces?",
        a: "Wash cold with similar colours and hang to dry. A little fading is part of the finish and softens with every wash.",
      },
      {
        q: "How do I care for knitwear?",
        a: "Hand wash cold, press out water without wringing, and dry flat. Fold it rather than hanging to keep its shape.",
      },
    ],
  },
];
