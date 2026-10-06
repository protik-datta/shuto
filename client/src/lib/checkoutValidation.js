import {
  isValidCardCvc,
  isValidCardExpiry,
  isValidCardNumber,
  isValidEmail,
  isValidPhone,
  isValidPostalCode,
} from "../utils/validation";

export const CHECKOUT_FIELD_ORDER = [
  "email",
  "phone",
  "name",
  "address",
  "city",
  "postalCode",
  "cardNumber",
  "cardExpiry",
  "cardCvc",
  "terms",
];

export const validateCheckout = ({
  values,
  paymentMethod,
  card,
  termsAccepted,
}) => {
  const errors = {};
  if (!isValidEmail(values.email))
    errors.email = "Enter a valid email address.";
  if (!isValidPhone(values.phone))
    errors.phone = "Enter a valid mobile number, like 01711000482.";
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (values.address.trim().length < 8)
    errors.address = "Enter your full street address.";
  if (values.city.trim().length < 2) errors.city = "Enter your city.";
  if (!isValidPostalCode(values.postalCode))
    errors.postalCode = "Enter a 4-digit postal code.";
  if (paymentMethod === "card") {
    if (!isValidCardNumber(card.number))
      errors.cardNumber = "Enter a 16-digit card number.";
    if (!isValidCardExpiry(card.expiry))
      errors.cardExpiry = "Use MM/YY, with a date that has not passed.";
    if (!isValidCardCvc(card.cvc))
      errors.cardCvc = "Enter the 3 or 4 digit code.";
  }
  if (!termsAccepted)
    errors.terms = "Please accept the terms to place your order.";
  return errors;
};
