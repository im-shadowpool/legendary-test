// utils/resolveCMSData.ts

export const resolveCMSData = (data: any, fallback: any) => {
  if (!fallback) return data;

  const result: any = {};

  for (const key in fallback) {
    const value = data?.[key];
    const fallbackValue = fallback[key];

    if (typeof fallbackValue === "string") {
      result[key] = value?.trim() ? value : fallbackValue;
    } else if (Array.isArray(fallbackValue)) {
      result[key] =
        Array.isArray(value) && value.length ? value : fallbackValue;
    } else if (typeof fallbackValue === "object" && fallbackValue !== null) {
      result[key] = resolveCMSData(value, fallbackValue); // recursive
    } else {
      result[key] = value ?? fallbackValue;
    }
  }

  return result;
};
