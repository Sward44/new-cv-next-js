import { useParams } from "next/navigation";
import { defaultLocale } from "../utils/i18n";

export const useCurrentLanguages = () => {
  const params = useParams();
  return params.locale || defaultLocale;
};
