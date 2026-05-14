"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";
import ReCAPTCHA from "react-google-recaptcha";
import { usePathname } from "next/navigation";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6LeUEMgsAAAAAA5DhG8IYcd2ISjKxsZLhnYRlYM0";

// Allowed file types and max size (5MB)
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function SampleForm() {
  const pathname = usePathname();
  const router = useRouter();
  const recaptchaRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    source: "",
    message: "",
    // New text fields
    fullAddress: "",
    suburb: "",
    statePostcode: "",
  });

  // Separate state for file uploads
  const [photo1, setPhoto1] = useState<File | null>(null);
  console.log("photo1", photo1);
  const [photo2, setPhoto2] = useState<File | null>(null);
  console.log("photo2", photo2);
  const [photo1Error, setPhoto1Error] = useState("");
  const [photo2Error, setPhoto2Error] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper to validate a file
  const validateFile = (file: File, fieldName: string): string => {
    if (!file) return `${fieldName} is required`;
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return `${fieldName} must be an image (JPEG, PNG, WEBP) or PDF`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${fieldName} must be less than 5MB`;
    }
    return "";
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (recaptchaError) setRecaptchaError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, "");
    handleChange("phone", digitsOnly);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    fieldName: string,
  ) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const validationError = validateFile(selectedFile, fieldName);
      if (validationError) {
        setError(validationError);
        setFile(null);
      } else {
        setError("");
        setFile(selectedFile);
      }
    } else {
      setFile(null);
      setError(`${fieldName} is required`);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Existing required fields
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";

    // New required text fields
    if (!form.fullAddress.trim())
      newErrors.fullAddress = "Full address is required";
    if (!form.suburb.trim()) newErrors.suburb = "Suburb is required";
    if (!form.statePostcode.trim())
      newErrors.statePostcode = "State & Post code is required";

    // File validations
    const photo1Err = validateFile(photo1!, "Photo 1");
    if (photo1Err) newErrors.photo1 = photo1Err;
    const photo2Err = validateFile(photo2!, "Photo 2");
    if (photo2Err) newErrors.photo2 = photo2Err;

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

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("source", form.source);
    formData.append("message", form.message);
    formData.append("fullAddress", form.fullAddress);
    formData.append("suburb", form.suburb);
    formData.append("statePostcode", form.statePostcode);
    formData.append("slug", pathname);
    formData.append("captchaToken", captchaToken);
    if (photo1) formData.append("photo1", photo1);
    if (photo2) formData.append("photo2", photo2);

    try {
      const res = await fetch("/api/free-sample", {
        method: "POST",
        body: formData, // Content-Type will be automatically set to multipart/form-data
      });

      const data = await res.json();

      if (!data.success) {
        alert("Form submission failed. Please try again.");
        setIsSubmitting(false);
      } else {
        router.push("/tye");
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
            placeholder="04 XX XXX XXX"
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        {/* Full Address - full width */}

        <Field label="Full Address*" error={errors.fullAddress}>
          <input
            required
            maxLength={200}
            value={form.fullAddress}
            onChange={(e) => handleChange("fullAddress", e.target.value)}
            placeholder="Street address, building, etc."
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        {/* Suburb and State & Post Code in two columns */}
        <Field label="Suburb*" error={errors.suburb}>
          <input
            required
            maxLength={100}
            value={form.suburb}
            onChange={(e) => handleChange("suburb", e.target.value)}
            placeholder="Suburb"
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        <Field label="State & Post Code*" error={errors.statePostcode}>
          <input
            required
            maxLength={50}
            value={form.statePostcode}
            onChange={(e) => handleChange("statePostcode", e.target.value)}
            placeholder="e.g. VIC 3000"
            className="h-[48px] py-4 text-body text-(--text-primary) w-full border-0 focus:outline-none focus:ring-0"
          />
        </Field>

        {/* Photo Upload Fields */}
        <FileUploadField
          label="Photo 1"
          error={errors.photo1 || photo1Error}
          onChange={(e) =>
            handleFileChange(e, setPhoto1, setPhoto1Error, "Photo 1")
          }
          accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
        />
        <FileUploadField
          label="Photo 2"
          error={errors.photo2 || photo2Error}
          onChange={(e) =>
            handleFileChange(e, setPhoto2, setPhoto2Error, "Photo 2")
          }
          accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
        />

        <div className="md:col-span-2">
          <CustomSelect
            label="How did you hear about Magnet-Me?"
            placeholder="Select source"
            options={[
              "Google",
              "Facebook",
              "Instagram",
              "Seen Magnet-Me at an event",
              "Relative/Friend Fridge",
              "Word of Mouth",
              "Easy Weddings",
              "Venue Supplier List",
              "Others",
              "Used Magnet-Me in the Past",
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

// Dedicated file upload field to keep code DRY
function FileUploadField({
  label,
  error,
  onChange,
  accept,
}: {
  label: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}) {
  return (
    <div className="flex flex-col group gap-2">
      <label className="text-body-low text-(--color-secondary) group-focus-within:text-(--color-brand) transition-all duration-300">
        {label}
      </label>
      <div className="border-b border-gray-300 group-focus-within:border-(--color-brand) transition-all duration-300 py-2">
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="w-full text-(--text-primary) file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-(--color-brand)/10 file:text-(--color-brand) hover:file:bg-(--color-brand)/20 transition-all duration-300 ease-in"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <p className="text-xs text-gray-500 mt-1">
        Accepted: Images (JPEG, PNG, WEBP) or PDF. Max 5MB.
      </p>
    </div>
  );
}
