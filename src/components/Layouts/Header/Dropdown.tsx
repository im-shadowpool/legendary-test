"use client";

import Image from "next/image";
import Link from "next/link";
import { DropdownSection } from "@/constants/data/Menu";

export default function Dropdown({
  data,
  pathname,
}: {
  data: DropdownSection[];
  pathname: string;
}) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const isSectionActive = (section: DropdownSection) => {
    return section.items.some((item) => isActive(item.href));
  };
  return (
    <div className="bg-(--color-primary) shadow-xl rounded-lg p-2 min-w-[238px]">
      {data.map((section, i) => (
        <div key={i} className={`relative group/item`}>
          {/* MAIN ITEM */}
          <div
            className={`p-3 flex-between-row cursor-pointer rounded-lg gap-1 hover:bg-[#FEE2E2] hover:text-(--color-brand) transition-all duration-300 ${isSectionActive(section) ? "bg-[#FEE2E2] text-(--color-brand)" : "text-(--text-primary)"}`}
          >
            <p>{section.title}</p>
          </div>

          {/* SUB DROPDOWN */}
          <div className="absolute left-full top-0 ml-2 opacity-0 invisible translate-x-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-x-0 transition-all duration-300">
            <div className="bg-(--color-primary) shadow-xl rounded-lg p-2 min-w-[238px]">
              {section.items.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className={
                    isActive(item.href) ? "active-link-dropdown-item" : ""
                  }
                >
                  <div className="dropdown-link-item p-3 flex-between-row cursor-pointer rounded-lg text-(--text-primary) hover:bg-[#FEE2E2] hover:text-(--color-brand) transition-all duration-300">
                    <p>{item.label}</p>

                    <Image
                      src="/arrow button.svg"
                      alt="Arrow"
                      width={26}
                      height={26}
                      className="dropdown-item-arrow"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
