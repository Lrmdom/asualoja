import en from "../public/locales/en/common.json";
import es from "../public/locales/es/common.json";
import pt from "../public/locales/pt/common.json";

// This is the list of languages your application supports
export const supportedLngs = ["pt", "es", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "pt";

// The default namespace of i18next is "translation", but you can customize it
// here
export const defaultNS = "translation";

export const resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
};

export default ({


})