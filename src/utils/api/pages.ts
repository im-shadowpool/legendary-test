import { fetchFromAPI } from "./fetcher";

export function fetchPageData(endpoint: string) {
  return fetchFromAPI(endpoint, {
    revalidate: 60,
  });
}

export const fetchHeaderData = () =>
  fetchFromAPI("header", { revalidate: 300 });

export const fetchFooterData = () =>
  fetchFromAPI("footer", { revalidate: 300 });
