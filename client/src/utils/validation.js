export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export const isValidPhone = (value) =>
  /^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ""));

export const isValidPostalCode = (value) => /^\d{4}$/.test(value.trim());

export const isValidCardNumber = (value) =>
  /^\d{16}$/.test(value.replace(/\s/g, ""));

export const isValidCardExpiry = (value) => {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value.trim());
  if (!match) return false;
  const expiry = new Date(
    2000 + Number(match[2]),
    Number(match[1]),
    0,
    23,
    59,
    59,
  );
  return expiry >= new Date();
};

export const isValidCardCvc = (value) => /^\d{3,4}$/.test(value.trim());
