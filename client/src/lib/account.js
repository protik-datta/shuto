import { STORAGE_KEYS } from "../constants/site";
import { readStorage, writeStorage } from "../utils/storage";

export const DEFAULT_ACCOUNT = {
  profile: {
    name: "Nabila Rahman",
    email: "nabila.rahman@example.com",
    phone: "01711000482",
  },
  addresses: [
    {
      id: "home",
      label: "Home",
      name: "Nabila Rahman",
      line: "House 22, Road 5, Dhanmondi",
      city: "Dhaka",
      postalCode: "1205",
      isDefault: true,
    },
    {
      id: "office",
      label: "Office",
      name: "Nabila Rahman",
      line: "Level 6, 41 Gulshan Avenue",
      city: "Dhaka",
      postalCode: "1212",
      isDefault: false,
    },
  ],
  preferences: { emailUpdates: true, smsUpdates: true, preferredSize: "M" },
};

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const getAccount = () => {
  const stored = readStorage(STORAGE_KEYS.account, {});
  const source = isObject(stored) ? stored : {};
  return {
    profile: {
      ...DEFAULT_ACCOUNT.profile,
      ...(isObject(source.profile) ? source.profile : {}),
    },
    addresses:
      Array.isArray(source.addresses) && source.addresses.length
        ? source.addresses.filter(isObject)
        : DEFAULT_ACCOUNT.addresses,
    preferences: {
      ...DEFAULT_ACCOUNT.preferences,
      ...(isObject(source.preferences) ? source.preferences : {}),
    },
  };
};

export const saveAccount = (account) =>
  writeStorage(STORAGE_KEYS.account, account);
