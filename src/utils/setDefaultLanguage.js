export const setDefaultLanguage = () => {
  const lan = "ar";
  const country = "SA";
  localStorage.setItem("language-setting", JSON.stringify(lan));
  localStorage.setItem("country", JSON.stringify(country));
};
