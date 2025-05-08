import he from "he";

export const decodeHtml = (text: string) => {
  const decoded = he.decode(text);
  return decoded.replace(/^(@\w+\s*)+|https?:\/\/\S+|www\.\S+/g, "");
};
