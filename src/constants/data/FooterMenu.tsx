// types
export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface QuickLink {
  name: string;
  href: string;
}

export interface OfficeHour {
  days: string;
  hours: string;
}

export interface Contact {
  phone: string;
}

export interface BottomLink {
  name: string;
  href: string;
}

// Icons as functions to avoid JSX in data file
export const getSocialIcons = () => ({
  Facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M24.5 3.5H3.5V24.5H14.7245V16.3788H11.991V13.1997H14.7245V10.8605C14.7245 8.14917 16.3823 6.671 18.802 6.671C19.6175 6.66867 20.4318 6.71067 21.2427 6.7935V9.6285H19.5767C18.2583 9.6285 18.0017 10.2515 18.0017 11.1708V13.195H21.1517L20.7422 16.3742H17.983V24.5H24.5V3.5Z"
        fill="#F05758"
      />
    </svg>
  ),
  Instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M3.5 3.5V24.5H24.5V3.5H3.5ZM21 5.83333C21.644 5.83333 22.1667 6.356 22.1667 7C22.1667 7.644 21.644 8.16667 21 8.16667C20.356 8.16667 19.8333 7.644 19.8333 7C19.8333 6.356 20.356 5.83333 21 5.83333ZM14 8.16667C17.2212 8.16667 19.8333 10.7788 19.8333 14C19.8333 17.2212 17.2212 19.8333 14 19.8333C10.7788 19.8333 8.16667 17.2212 8.16667 14C8.16667 10.7788 10.7788 8.16667 14 8.16667ZM14 10.5C13.0717 10.5 12.1815 10.8687 11.5251 11.5251C10.8687 12.1815 10.5 13.0717 10.5 14C10.5 14.9283 10.8687 15.8185 11.5251 16.4749C12.1815 17.1313 13.0717 17.5 14 17.5C14.9283 17.5 15.8185 17.1313 16.4749 16.4749C17.1313 15.8185 17.5 14.9283 17.5 14C17.5 13.0717 17.1313 12.1815 16.4749 11.5251C15.8185 10.8687 14.9283 10.5 14 10.5Z"
        fill="#F05758"
      />
    </svg>
  ),
  LinkedIn: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M24.5 3.5H3.5V24.5H24.5V3.5ZM10.5 19.8333H7.5565V11.6667H10.5V19.8333ZM8.97633 10.1698C8.07683 10.1698 7.476 9.57017 7.476 8.76983C7.476 7.9695 8.07567 7.36983 9.0755 7.36983C9.975 7.36983 10.5758 7.9695 10.5758 8.76983C10.5758 9.57017 9.97617 10.1698 8.97633 10.1698ZM21 19.8333H18.151V15.3697C18.151 14.1353 17.3915 13.8507 17.1068 13.8507C16.8222 13.8507 15.8725 14.0408 15.8725 15.3697C15.8725 15.5598 15.8725 19.8333 15.8725 19.8333H12.929V11.6667H15.8725V12.8065C16.2517 12.1415 17.0112 11.6667 18.4357 11.6667C19.8602 11.6667 21 12.8065 21 15.3697V19.8333Z"
        fill="#F05758"
      />
    </svg>
  ),
  YouTube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M24.5 5.83317C24.5 5.83317 21 4.6665 14 4.6665C7.00004 4.6665 3.50004 5.83317 3.50004 5.83317C3.50004 5.83317 2.33337 9.33317 2.33337 13.9998C2.33337 18.6665 3.50004 22.1665 3.50004 22.1665C3.50004 22.1665 7.00004 23.3332 14 23.3332C21 23.3332 24.5 22.1665 24.5 22.1665C24.5 22.1665 25.6667 18.6665 25.6667 13.9998C25.6667 9.33317 24.5 5.83317 24.5 5.83317ZM11.6667 18.0412V9.9585L18.6667 13.9998L11.6667 18.0412Z"
        fill="#F05758"
      />
    </svg>
  ),
});

export const footerData = {
  socialLinks: [
    { name: "Facebook", url: "https://www.facebook.com/magnetme.com.au" },
    { name: "Instagram", url: "https://www.instagram.com/magnet.me" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/magnet-me-photo-magnets",
    },
    { name: "YouTube", url: "https://www.youtube.com/@magnetme-photomagnets" },
  ],

  sections: [
    {
      title: "Quick links",
      links: [
        { name: "About", href: "/about-us" },
        { name: "How it works", href: "/how-it-works" },
        { name: "Frames", href: "/gallery" },
        { name: "Franchise", href: "/franchise" },
        { name: "FAQs", href: "/faqs" },
        { name: "Blog", href: "/blogs" },
        { name: "Contact", href: "/contact-us" },
      ],
    },
    {
      title: "Events",
      links: [
        { name: "Corporate", href: "/event/corporate-events" },
        { name: "Weddings", href: "/event/weddings" },
        { name: "Graduations", href: "/event/graduations" },
        { name: "Gala", href: "/event/gala" },
        { name: "Birthdays", href: "/event/birthdays" },
        { name: "Christmas", href: "/event/christmas-parties" },
        { name: "Awards Night", href: "/event/award-nights" },
        {
          name: "Trade Shows & Brand Activations",
          href: "/event/trade-shows-brand-activations",
        },
        { name: "Bar-Mitzvah", href: "/event/bar-mitzvah" },
        { name: "Sport Events", href: "/event/sport-events" },
      ],
    },
  ],

  officeHours: [
    { days: "Monday - Thursday", hours: "10:00AM - 5:00PM" },
    { days: "Friday", hours: "10:00AM - 3:00PM" },
    { days: "Saturday - Sunday", hours: "Closed" },
  ],

  contact: {
    phone: "1800 94 09 09",
  },

  bottomLinks: [
    {
      name: "Terms of Use",
      href: "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/MAGNET-ME-WEBSITE-TERMS-OF-USE.pdf",
    },
    {
      name: "Privacy policy",
      href: "https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/MagnetMe-Privacy-Policy.pdf",
    },
    { name: "Sitemap", href: "/sitemap" },
  ],
};
