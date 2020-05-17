import eng from "../translate/languages/eng.json";
import pl from "../translate/languages/pl.json";

interface languagesFile {
  [key: string]: string;
}

const languages = {
  eng: eng as languagesFile,
  pl: pl as languagesFile,
};

export type LangKey = keyof typeof languages;

export default languages;

export const currentLang = () => (localStorage.getItem("language") || "pl") as LangKey;
