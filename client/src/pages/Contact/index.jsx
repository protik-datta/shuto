import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Field from "../../components/ui/Field";
import { SITE } from "../../constants/site";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";
import { isValidEmail } from "../../utils/validation";

const TOPICS = [
  "Order or delivery",
  "Returns and exchanges",
  "Sizing help",
  "Something else",
];
const EMPTY = { name: "", email: "", topic: TOPICS[0], message: "" };

export default function Contact() {
  const { showToast } = useToast();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  usePageMeta({
    title: "Contact",
    description:
      "Get in touch with the Shuto team by email, phone or at our Banani store.",
  });

  const bind = (key) => ({
    value: values[key],
    error: errors[key],
    onChange: (event) =>
      setValues((current) => ({ ...current, [key]: event.target.value })),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = {};
    if (values.name.trim().length < 2) found.name = "Enter your name.";
    if (!isValidEmail(values.email))
      found.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      found.message = "Tell us a little more, at least 10 characters.";
    setErrors(found);
    const first = ["name", "email", "message"].find((key) => found[key]);
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setIsSent(true);
    showToast("Your message has been sent");
  };

  const details = [
    {
      Icon: Mail,
      label: "Email",
      value: (
        <a href={`mailto:${SITE.email}`} className="link-underline">
          {SITE.email}
        </a>
      ),
    },
    {
      Icon: Phone,
      label: "Phone",
      value: (
        <a
          href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
          className="link-underline"
        >
          {SITE.phone}
        </a>
      ),
    },
    { Icon: MapPin, label: "Store", value: SITE.address },
    { Icon: Clock, label: "Opening hours", value: SITE.hours },
  ];

  return (
    <div className="container-page py-6 lg:py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <h1 className="mt-4 text-h1 font-semibold">Contact us</h1>
      <p className="mt-2 max-w-xl text-stone">
        We usually reply within one working day. For quick answers, check the{" "}
        <Link to="/faq" className="underline">
          FAQ
        </Link>
        .
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        {isSent ? (
          <div
            role="status"
            className="self-start border border-line bg-white p-6"
          >
            <h2 className="text-h2 font-semibold">Message sent</h2>
            <p className="mt-2 text-charcoal">
              Thanks, {values.name.split(" ")[0]}. This is a frontend demo, so
              the message was not delivered anywhere.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(EMPTY);
                setIsSent(false);
              }}
              className="btn btn-outline mt-5"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid gap-4 sm:grid-cols-2"
          >
            <Field
              id="name"
              label="Name"
              autoComplete="name"
              {...bind("name")}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              {...bind("email")}
            />
            <Field
              id="topic"
              as="select"
              label="Topic"
              className="sm:col-span-2"
              {...bind("topic")}
            >
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Field>
            <Field
              id="message"
              as="textarea"
              label="Message"
              className="sm:col-span-2"
              {...bind("message")}
            />
            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-primary">
                Send message
              </button>
            </div>
          </form>
        )}

        <dl className="space-y-5 self-start text-sm">
          {details.map(({ Icon, label, value }) => (
            <div key={label} className="flex gap-3">
              <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <dt className="font-medium">{label}</dt>
                <dd className="text-charcoal">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
