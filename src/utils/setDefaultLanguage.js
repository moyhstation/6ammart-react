export const setDefaultLanguage = () => {
  const lan = "en";
  const country = "US";
  localStorage.setItem("language-setting", JSON.stringify(lan));
  localStorage.setItem("country", JSON.stringify(country));
};
