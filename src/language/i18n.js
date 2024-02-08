import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { english } from "./en";
import { bengali } from "./bn";
import { arabic } from "./ar";
import { spain } from "./es";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: english,
  },
  es: {
    translation: spain,
  },
  bn: {
    translation: bengali,
  },
  ar: {
    translation: arabic,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
