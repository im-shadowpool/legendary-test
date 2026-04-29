"use client";

import Image from "next/image";
import Link from "next/link";
import { footerData, getSocialIcons } from "@/constants/data/FooterMenu";

export default function Footer() {
  const socialIcons = getSocialIcons();

  return (
    <footer className="bg-(--color-secondary) w-full">
      <section className="section">
        <div className="custom-container pt-16 pb-6">
          {/* Top Grid */}
          <div className="flex flex-wrap justify-between items-start gap-10">
            {/* Logo + Description */}
            <div className="flex-start-col gap-6 w-full lg:w-[457px] shrink-0">
              <Image
                src={"/magnet-logo.svg"}
                alt="Logo"
                width={190}
                height={52}
              />
              <p className="text-(--text-secondary) text-body">
                Australia's leading custom photo magnet event service.
                Professional roaming photography and live on-site printing,
                trusted across weddings, corporate events, birthdays,
                graduations, and more since 2013.
              </p>
              {/* Social Icons */}
              <div className="flex-start-row gap-3">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-hover-white"
                  >
                    {socialIcons[social.name as keyof typeof socialIcons]}
                  </a>
                ))}
              </div>
            </div>

            {/* Dynamic Sections (Quick Links & Events) */}
            {footerData.sections.map((section) => (
              <div key={section.title} className="flex-start-col gap-6">
                <h3 className="footer-headings text-(--color-primary)">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-(--text-secondary) text-body">
                  {section.links.map((item) => (
                    <li key={item.name} className="inline-link-style">
                      <Link
                        href={item.href}
                        className="hover:text-white transition"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Office Hours */}
            <div className="flex-start-col gap-6">
              <h3 className="footer-headings text-(--color-primary)">
                Office hours
              </h3>

              <div className="flex-start-col gap-5 text-(--text-secondary) text-body">
                {footerData.officeHours.map((item) => (
                  <div key={item.days} className="flex items-start gap-2">
                    <svg
                      className="mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.65293 7.566V3.8H7.60293V8L10.573 10.9701L11.315 10.2281L8.65293 7.566ZM8.12793 15C4.26183 15 1.12793 11.8661 1.12793 8C1.12793 4.1339 4.26183 1 8.12793 1C11.994 1 15.1279 4.1339 15.1279 8C15.1279 11.8661 11.994 15 8.12793 15Z"
                        fill="#F05758"
                      />
                    </svg>
                    <p>
                      {item.days}:<br />
                      {item.hours}
                    </p>
                  </div>
                ))}

                <div className="flex items-center gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                    viewBox="0 0 15 15"
                    fill="none"
                    className="mt-1"
                  >
                    <g clipPath="url(#clip0_30489_14346)">
                      <path
                        d="M12.709 7.06307H14.1675C14.1675 3.4388 11.2287 0.5 7.60441 0.5V1.95846C10.4265 1.95846 12.709 4.24095 12.709 7.06307ZM9.7921 7.06307H11.2506C11.2506 5.05039 9.61709 3.41692 7.60441 3.41692V4.87538C8.81493 4.87538 9.7921 5.85255 9.7921 7.06307ZM8.48678 10.979C6.42306 9.92894 4.73124 8.24442 3.68115 6.17341L5.52611 4.32846L5.08128 0.5H1.06322C0.640265 7.92356 6.74392 14.0272 14.1675 13.6043V9.5862L10.3244 9.14137L8.48678 10.979Z"
                        fill="#F05758"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_30489_14346">
                        <rect width={15} height={15} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <Link
                    href={`tel:${footerData.contact.phone}`}
                    className="text-body text-(--text-secondary) inline-link-style"
                  >
                    {footerData.contact.phone}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-(--text-caption) mt-16 mb-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p className="text-body text-(--text-secondary)">
              © Copyright 2026 Magnet Me. All Rights Reserved.
            </p>

            <div className="flex gap-6">
              {footerData.bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="text-body text-(--text-secondary) inline-link-style"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
