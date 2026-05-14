export type DropdownItem = {
  label: string;
  href: string;
};
export type DropdownSection = {
  title: string;
  items: DropdownItem[];
};
export type MenuItem = {
  label: string;
  href: string;
  dropdown?: DropdownSection[];
};
export const menuData: MenuItem[] = [
  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "How it Works",
    href: "/how-it-works",
  },
  {
    label: "Events",
    href: "/event",
    dropdown: [
      {
        title: "Corporate Events",
        items: [
          { label: "Corporate Events", href: "/event/corporate-events" },
          { label: "Gala Events", href: "/event/gala" },
          { label: "Christmas Parties", href: "/event/christmas-parties" },
          { label: "Awards Nights", href: "/event/award-nights" },
          { label: "Graduations", href: "/event/graduations" },
          { label: "Fundraisers", href: "/event/fundraisers" },
          { label: "End of Year Party", href: "/event/end-of-year-party" },
          { label: "Sport Events", href: "/event/sport-events" },
          {
            label: "School Events",
            href: "/event/school",
          },
          {
            label: "Universities Events",
            href: "/event/universities",
          },
          {
            label: "Trade Shows",
            href: "/event/trade-shows-brand-activations",
          },
        ],
      },
      {
        title: "Private Events",
        items: [
          // { label: "Private Events", href: "/event/private-events" },
          { label: "Weddings", href: "/event/weddings" },
          { label: "Engagement Parties", href: "/event/engagement-parties" },
          { label: "Birthdays", href: "/event/birthdays" },
          { label: "Bar Mitzvah", href: "/event/bar-mitzvah" },
          { label: "Bat Mitzvah", href: "/event/bat-mitzvah" },
          // { label: "Anniversary", href: "/event/anniversary" },
          // { label: "Christening", href: "/event/christening" },
        ],
      },
    ],
  },
  {
    label: "Frames",
    href: "/gallery",
  },
  {
    label: "FAQs",
    href: "/faqs",
  },
  {
    label: "Franchise",
    href: "/franchise",
  },
];
