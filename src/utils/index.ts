export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObj = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const urlString = (object: { [key: string]: unknown }) => {
  const obj = cleanObj(object);
  let str = "";
  for (const key in obj) {
    const value = obj[key];
    str += key + "=" + value + "&";
  }
  return str.slice(0, -1);
};

export const resetRoute = () => (window.location.href = window.location.origin);
