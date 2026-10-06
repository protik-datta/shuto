import { useState } from "react";
import Field from "../../components/ui/Field";
import { useToast } from "../../context/ToastContext";
import useAccount from "../../hooks/useAccount";
import usePageMeta from "../../hooks/usePageMeta";
import { isValidEmail, isValidPhone } from "../../utils/validation";
import AccountLayout from "./AccountLayout";

const SIZES = ["XS", "S", "M", "L", "XL"];
const sectionClass =
  "scroll-mt-28 border-b border-line pb-10 mb-10 last:border-b-0";

function ProfileSection({ account, onSave }) {
  const { showToast } = useToast();
  const [values, setValues] = useState(account.profile);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = {};
    if (values.name.trim().length < 2) found.name = "Enter your full name.";
    if (!isValidEmail(values.email))
      found.email = "Enter a valid email address.";
    if (!isValidPhone(values.phone))
      found.phone = "Enter a valid mobile number.";
    setErrors(found);
    if (Object.keys(found).length) return;
    onSave({ profile: values });
    showToast("Profile saved");
  };

  const bind = (key) => ({
    value: values[key],
    error: errors[key],
    onChange: (event) =>
      setValues((current) => ({ ...current, [key]: event.target.value })),
  });

  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className={sectionClass}
    >
      <h2 id="profile-heading" className="text-h2 font-semibold">
        Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-5 grid max-w-xl gap-4 sm:grid-cols-2"
      >
        <Field
          id="profile-name"
          label="Full name"
          autoComplete="name"
          className="sm:col-span-2"
          {...bind("name")}
        />
        <Field
          id="profile-email"
          label="Email"
          type="email"
          autoComplete="email"
          {...bind("email")}
        />
        <Field
          id="profile-phone"
          label="Mobile number"
          type="tel"
          autoComplete="tel"
          {...bind("phone")}
        />
        <div className="sm:col-span-2">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
}

function AddressSection({ account, onSave }) {
  const { showToast } = useToast();
  const { addresses } = account;

  const setDefault = (id) => {
    onSave({
      addresses: addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    });
    showToast("Default address updated");
  };
  const remove = (id) => {
    const remaining = addresses.filter((address) => address.id !== id);
    onSave({
      addresses: remaining.some((address) => address.isDefault)
        ? remaining
        : remaining.map((address, index) => ({
            ...address,
            isDefault: index === 0,
          })),
    });
    showToast("Address removed");
  };

  return (
    <section
      id="addresses"
      aria-labelledby="addresses-heading"
      className={sectionClass}
    >
      <h2 id="addresses-heading" className="text-h2 font-semibold">
        Addresses
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <li
            key={address.id}
            className="flex flex-col border border-line bg-white p-4 text-sm"
          >
            <p className="font-semibold">
              {address.label}
              {address.isDefault && (
                <span className="ml-2 bg-sand px-2 py-0.5 text-meta font-medium">
                  Default
                </span>
              )}
            </p>
            <p className="mt-2">{address.name}</p>
            <p className="text-charcoal">
              {address.line}, {address.city} {address.postalCode}
            </p>
            <div className="mt-4 flex gap-4">
              {!address.isDefault && (
                <button
                  type="button"
                  onClick={() => setDefault(address.id)}
                  className="link-underline"
                >
                  Make default
                </button>
              )}
              {addresses.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(address.id)}
                  className="link-underline text-stone"
                >
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PreferencesSection({ account, onSave }) {
  const { showToast } = useToast();
  const { preferences } = account;

  const change = (changes) => {
    onSave({ preferences: { ...preferences, ...changes } });
    showToast("Preferences saved");
  };

  return (
    <section
      id="preferences"
      aria-labelledby="preferences-heading"
      className={sectionClass}
    >
      <h2 id="preferences-heading" className="text-h2 font-semibold">
        Preferences
      </h2>
      <div className="mt-5 max-w-xl space-y-4 text-sm">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={preferences.emailUpdates}
            onChange={(event) => change({ emailUpdates: event.target.checked })}
            className="h-4 w-4 accent-ink"
          />
          Email me about new drops
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={preferences.smsUpdates}
            onChange={(event) => change({ smsUpdates: event.target.checked })}
            className="h-4 w-4 accent-ink"
          />
          SMS updates for deliveries
        </label>
        <Field
          id="preferred-size"
          as="select"
          label="Usual size"
          value={preferences.preferredSize}
          onChange={(event) => change({ preferredSize: event.target.value })}
          className="max-w-48"
        >
          {SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Field>
      </div>
    </section>
  );
}

export default function Account() {
  const [account, updateAccount] = useAccount();
  usePageMeta({
    title: "Account",
    description: "Manage your profile, addresses and preferences.",
  });

  return (
    <AccountLayout>
      <ProfileSection account={account} onSave={updateAccount} />
      <AddressSection account={account} onSave={updateAccount} />
      <PreferencesSection account={account} onSave={updateAccount} />
    </AccountLayout>
  );
}
