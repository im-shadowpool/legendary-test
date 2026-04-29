"use client";

import Dropdown from "./Dropdown";
import Link from "next/link";
import { menuData } from "@/constants/data/Menu";

export default function Menu({
  isLightPage,
  pathname,
}: {
  isLightPage: boolean;
  pathname: string;
}) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const isDropdownActive = (dropdown: any) => {
    return dropdown.some((section: any) =>
      section.items.some((item: any) => isActive(item.href)),
    );
  };

  return (
    <nav className="flex-center-row gap-8 relative magnet-menu">
      {menuData.map((item: any, index: number) => {
        // NORMAL LINK
        if (!item.dropdown) {
          return (
            <Link
              key={index}
              href={item.href}
              className={`menu-item-text transition magnet-dropdown-text inline-link-style ${isLightPage ? "text-(--color-secondary)" : "text-(--color-primary)"} ${isActive(item.href) ? "active-link" : ""}`}
            >
              {item.label}
            </Link>
          );
        }

        // DROPDOWN ITEM
        return (
          <div
            className={`relative group ${isDropdownActive(item.dropdown) ? "active-dropdown" : ""}`}
            key={index}
          >
            {/* TRIGGER ONLY */}
            <div className="flex items-center gap-2 px-3 py-2 cursor-pointer dropdown-parent-item">
              <Link
                href={item.href}
                className={`menu-item-text text-(--color-primary) magnet-dropdown-text ${isLightPage ? "text-(--color-secondary)" : "text-(--color-primary)"}`}
              >
                {item.label}
              </Link>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                className="transition-transform duration-200"
              >
                <path
                  d="M12 7L7 12L2 7"
                  stroke={isLightPage ? "var(--color-secondary)" : "white"}
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* DROPDOWN */}
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible pointer-events-none transition-all duration-300 ease-out translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0">
              <Dropdown data={item.dropdown} pathname={pathname} />
            </div>
          </div>
        );
      })}
    </nav>
  );
}
