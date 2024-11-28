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
  pt: () =>
    import("../../components/dictionaries/pt.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale) => dictionaries[locale]();
