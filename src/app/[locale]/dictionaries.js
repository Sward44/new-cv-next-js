import "server-only";

const dictionaries = {
  en: () =>
    import("../../components/dictionaries/en.json").then(
      (module) => module.default
    ),
  fr: () =>
    import("../../components/dictionaries/fr.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale) => dictionaries[locale]();
