export const decodeHtml = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  const decoded = textarea.value.replace(
    /^(@\w+\s*)+|https?:\/\/\S+|www\.\S+/g,
    ""
  );

  return decoded;
};
