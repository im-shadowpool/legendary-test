import { BASE_API_URL } from "../../constants/constants";

export async function fetchFromAPI(
  endpoint: string,
  { revalidate = 60, headers = {} } = {},
) {
  const url = `${BASE_API_URL}/wp-json/meta/v1/${endpoint}`;
  // console.log(url);
  try {
    const res = await fetch(url, {
      next: { revalidate },
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    // console.log("res", res);

    if (!res.ok) {
      console.error("API failed:", res.status, url);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
