import eng from "../translate/languages/eng";
import pl from "../translate/languages/pl";

const languages = {
  eng,
  pl
};

export default languages;

export const currentLang = () => localStorage.getItem("language") || "pl";
