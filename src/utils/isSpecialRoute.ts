export const SPECIAL_ROUTES = [
  "/faqs",
  "/contact-us",
  "/blogs",
  "/blog",
  "/thank-you",
];

export const isSpecialRoute = (pathname: string): boolean => {
  return SPECIAL_ROUTES.some((route) => pathname.startsWith(route));
};
