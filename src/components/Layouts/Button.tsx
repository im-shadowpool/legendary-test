import Link from "next/link";
import { forwardRef } from "react";

interface ButtonProps {
  text: string;
  href?: string;
  external?: boolean;
  className?: string;
  variant?: "default" | "call"; // new prop
}

const Button = forwardRef(function Button(
  {
    text,
    href,
    external = false,
    className = "",
    variant = "default",
  }: ButtonProps,
  ref: React.Ref<HTMLAnchorElement>,
) {
  if (href) {
    const isExternal = external || href.startsWith("http");

    // Define icon sets based on variant
    const icons = {
      default: {
        leftIcon: (
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
        ),
        rightIcon: (
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
        ),
      },
      call: {
        // 🔁 Replace these with your actual alternative SVG icons
        leftIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_30788_12531)">
              <path
                d="M13.5572 7.53381H15.1129C15.1129 3.66792 11.9781 0.533203 8.11225 0.533203V2.08889C11.1225 2.08889 13.5572 4.52355 13.5572 7.53381ZM10.4458 7.53381H12.0015C12.0015 5.38696 10.2591 3.64458 8.11225 3.64458V5.20027C9.40347 5.20027 10.4458 6.24259 10.4458 7.53381ZM9.05344 11.7108C6.85214 10.5907 5.04754 8.79392 3.92744 6.58484L5.89539 4.61689L5.4209 0.533203H1.13497C0.683824 8.45167 7.19439 14.9622 15.1129 14.5111V10.2252L11.0136 9.75067L9.05344 11.7108Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_30788_12531">
                <rect width={16} height={16} fill="#F05758" />
              </clipPath>
            </defs>
          </svg>
        ),
        rightIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_30788_12531)">
              <path
                d="M13.5572 7.53381H15.1129C15.1129 3.66792 11.9781 0.533203 8.11225 0.533203V2.08889C11.1225 2.08889 13.5572 4.52355 13.5572 7.53381ZM10.4458 7.53381H12.0015C12.0015 5.38696 10.2591 3.64458 8.11225 3.64458V5.20027C9.40347 5.20027 10.4458 6.24259 10.4458 7.53381ZM9.05344 11.7108C6.85214 10.5907 5.04754 8.79392 3.92744 6.58484L5.89539 4.61689L5.4209 0.533203H1.13497C0.683824 8.45167 7.19439 14.9622 15.1129 14.5111V10.2252L11.0136 9.75067L9.05344 11.7108Z"
                fill="#F05758"
              />
            </g>
            <defs>
              <clipPath id="clip0_30788_12531">
                <rect width={16} height={16} fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
      },
    };

    const selectedIcons = icons[variant] || icons.default;

    return (
      <div className="relative">
        <Link
          href={href}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`magnet-button ${className}`}
          ref={ref}
        >
          <span className="magnet-btn-icon-1">{selectedIcons.leftIcon}</span>
          <p className="text-body text-center">{text}</p>
          <span className="magnet-btn-icon-2">{selectedIcons.rightIcon}</span>
        </Link>
      </div>
    );
  }

  // If you want to handle non‑link buttons (e.g., <button>), add that logic here.
  return null;
});

export default Button;
