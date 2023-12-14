import { de, es, fr } from "date-fns/locale";

export const getLocale = (langCode: string | undefined) => {
  switch (langCode) {
    case "fr":
      return fr;
    case "de":
      return de;
    case "es":
      return es;
    default:
      return fr;
  }
};
