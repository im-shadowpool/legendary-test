"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LeUEMgsAAAAAA5DhG8IYcd2ISjKxsZLhnYRlYM0";

export default function EventForm() {
  const pathname = usePathname();
  const router = useRouter();
  const recaptchaRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "",
    eventType: "",
    venue: "",
    date: "",
    time: "",
    source: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    // Clear recaptcha error if user interacts with recaptcha
    if (recaptchaError) setRecaptchaError("");
  };

  // Special handler for phone to block non-digit characters
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, "");
    handleChange("phone", digitsOnly);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Full name
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone: only required (input already restricts to digits)
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Guests
    if (!form.guests) {
      newErrors.guests = "Number of guests is required";
    } else if (parseInt(form.guests) < 1) {
      newErrors.guests = "Guests must be at least 1";
    }

    if (!form.eventType) newErrors.eventType = "Select event type";
    if (!form.venue) newErrors.venue = "Select venue";
    if (!form.date) newErrors.date = "Select event date";
    if (!form.time) newErrors.time = "Enter event time";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const captchaToken = recaptchaRef.current?.getValue();
    if (!captchaToken) {
      setRecaptchaError("Please verify that you are not a robot");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          slug: pathname,
          captchaToken,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Form submission failed. Please try again.");
        setIsSubmitting(false);
      } else {
        router.push("/thank-you");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-0 lg:px-16">
      <form
        className={`grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-6 lg:gap-y-8 transition-all duration-300 ${
          isSubmitting ? "opacity-50 pointer-events-none" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <Field label="Full name*" error={errors.fullName}>
          <input
            required
            maxLength={40}
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        <Field label="Email address*" error={errors.email}>
          <input
            type="email"
            required
            maxLength={40}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        <Field label="Phone number*" error={errors.phone}>
          <input
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="Enter only digits (e.g., 0412345678)"
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        <Field label="Number of guests*" error={errors.guests}>
          <input
            type="number"
            min={1}
            maxLength={4}
            required
            value={form.guests}
            placeholder="0"
            onChange={(e) => handleChange("guests", e.target.value)}
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        {/* Custom Select components remain unchanged */}
        <CustomSelect
          label="Event type*"
          options={[
            "Wedding",
            "Birthday",
            "Corporate",
            "Gala Events",
            "Christmas Parties",
            "Awards Nights",
            "Graduations",
            "Fundraisers",
            "End of Year Party",
            "Sport Events",
            "School Events",
            "Universities Events",
            "Trade Shows",
            "Engagement Parties",
            "Bar Mitzvah",
            "Anniversary",
            "Christening",
          ]}
          value={form.eventType}
          placeholder="Choose event type"
          onChange={(val: string) => handleChange("eventType", val)}
          error={errors.eventType}
        />

        <CustomSelect
          label="Venue*"
          placeholder="Choose your venue"
          options={["Indoor", "Outdoor", "Destination"]}
          value={form.venue}
          onChange={(val: string) => handleChange("venue", val)}
          error={errors.venue}
        />

        <Field label="Event date*" error={errors.date}>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        <Field label="Event time*" error={errors.time}>
          <input
            placeholder="Event Time from - to (appx)"
            required
            maxLength={20}
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        <div className="md:col-span-2">
          <CustomSelect
            label="How did you hear about Magnet-Me?"
            placeholder="Select source"
            options={[
              "Instagram",
              "Google",
              "Facebook",
              "Friend/Family",
              "Email Newsletter",
              "Referral",
              "Other",
            ]}
            value={form.source}
            onChange={(val: string) => handleChange("source", val)}
            full
            error={errors.source}
          />
        </div>

        <div className="md:col-span-2">
          <Field label="Your message" error={errors.message}>
            <textarea
              maxLength={800}
              placeholder="Enter your message (optional)"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="h-[56px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
          {recaptchaError && (
            <p className="text-red-500 text-xs mt-1">{recaptchaError}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            className="magnet-button"
            type="submit"
            disabled={isSubmitting}
          >
            <span className="magnet-btn-icon-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M2.61663 0.902344L8.90234 0.902344C8.90234 0.902344 7.75949 7.15798 7.75949 10.0452C7.75949 13.6542 10.0452 16.5414 12.3309 16.5414C14.6166 16.5414 16.9023 13.6542 16.9023 10.0452C16.9023 7.15798 15.7595 0.902344 15.7595 0.902344L22.0452 0.902344C22.0452 0.902344 23.7595 6.48189 23.7595 11.7294C23.7595 18.346 19.1881 23.7595 12.3309 23.7595C5.47377 23.7595 0.902344 18.346 0.902344 11.7294C0.902344 6.48189 2.61663 0.902344 2.61663 0.902344Z"
                  fill="#F05758"
                  stroke="white"
                  strokeWidth="1.80451"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.47266 6.6167L7.75837 6.6167L1.47266 6.6167ZM16.9012 6.6167L23.1869 6.6167L16.9012 6.6167Z"
                  fill="#F05758"
                />
                <path
                  d="M1.47266 6.6167L7.75837 6.6167M16.9012 6.6167L23.1869 6.6167"
                  stroke="white"
                  strokeWidth="2.25564"
                />
              </svg>
            </span>
            <p className="text-body">
              {isSubmitting ? "Submitting..." : "SEND MESSAGE"}
            </p>
            <span className="magnet-btn-icon-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M2.61651 0.902344L8.90222 0.902344C8.90222 0.902344 7.75936 7.15798 7.75936 10.0452C7.75936 13.6542 10.0451 16.5414 12.3308 16.5414C14.6165 16.5414 16.9022 13.6542 16.9022 10.0452C16.9022 7.15798 15.7594 0.902344 15.7594 0.902344L22.0451 0.902344C22.0451 0.902344 23.7594 6.48189 23.7594 11.7294C23.7594 18.346 19.1879 23.7595 12.3308 23.7595C5.47365 23.7595 0.902222 18.346 0.902222 11.7294C0.902222 6.48189 2.61651 0.902344 2.61651 0.902344Z"
                  fill="white"
                  stroke="#F05758"
                  strokeWidth="1.80451"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.47144 6.62012L7.75715 6.62012L1.47144 6.62012ZM16.9 6.62012L23.1857 6.62012L16.9 6.62012Z"
                  fill="white"
                />
                <path
                  d="M1.47144 6.62012L7.75715 6.62012M16.9 6.62012L23.1857 6.62012"
                  stroke="#F05758"
                  strokeWidth="2.25564"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col group gap-2">
      <label className="text-body-low text-(--color-secondary) group-focus-within:text-(--color-brand) transition-all duration-300">
        {label}
      </label>
      <div className="border-b border-gray-300 group-focus-within:border-(--color-brand) transition-all duration-300">
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
