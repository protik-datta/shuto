import { useId, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { isValidEmail } from "../../utils/validation";

export default function NewsletterForm({ inverted = false }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();
  const errorId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    showToast("You are subscribed. Welcome to Shuto.");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          autoComplete="email"
          className="input min-w-0 flex-1 rounded-r-none border-r-0"
        />
        <button
          type="submit"
          className={`btn rounded-l-none ${inverted ? "btn-light" : "btn-primary"}`}
        >
          Subscribe
        </button>
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-meta text-sale">
          {error}
        </p>
      )}
    </form>
  );
}
