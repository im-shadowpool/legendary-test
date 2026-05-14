export const SPECIAL_ROUTES = [
  "/faqs",
  "/contact-us",
  "/blogs",
  "/blog",
  "/tye",
  "/tyl",
  "/free-photo-magnets-samples",
];

export const isSpecialRoute = (pathname: string): boolean => {
  return SPECIAL_ROUTES.some((route) => pathname.startsWith(route));
};
