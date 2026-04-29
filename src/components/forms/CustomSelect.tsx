"use client";

import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  label,
  options,
  placeholder,
  onChange,
  value,
  error,
  full = false,
}: any) {
  const [open, setOpen] = useState(false);

  const ref = useRef<any>(null);
  const selected = value;
  const handleSelect = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-2 ${full ? "md:col-span-2" : ""}`}
    >
      {/* 👇 Hidden input for browser validation */}
      <label
        className={`text-body-low transition-all duration-300 ${open ? "text-(--color-brand)" : "text-(--color-secondary)"}`}
      >
        {label}
      </label>

      {/* Trigger */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`border-b transition-all duration-300 h-[48px] py-4 flex justify-between items-center cursor-pointer ${
          error
            ? "border-red-500"
            : open
              ? "border-(--color-brand)"
              : "border-gray-300"
        }`}
      >
        <span
          // className={`text-body ${selected ? "text-(--text-primary)" : "text-black/40"}`}
          className={`text-body text-(--text-primary)`}
        >
          {selected || placeholder}
        </span>

        {/* Custom SVG Arrow */}
        <svg
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 22 22"
          fill="none"
        >
          <g clipPath="url(#clip0_30457_19723)">
            <path
              d="M17.875 8.25L11 15.125L4.125 8.25"
              stroke={`${open ? "var(--color-brand)" : "#4F4F4F"}`}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_30457_19723">
              <rect width={22} height={22} fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md overflow-hidden mt-2 shadow transition-all duration-300 origin-top z-50
        ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        {options.map((opt: string) => (
          <div
            key={opt}
            onClick={() => handleSelect(opt)}
            className="px-4 py-3 text-sm hover:bg-(--color-accent) cursor-pointer"
          >
            {opt}
          </div>
        ))}
      </div>

      {error && (
        <span className="text-body text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
}
