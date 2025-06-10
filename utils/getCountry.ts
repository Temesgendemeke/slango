import { flags } from "@/constants/flags";
import { languages } from "@/constants/languages";

const getFlag = (code) => {
  const flag = flags.find((flag) => flag.code === code);
  return flag;
};

export const getCountry = (code) => {
  const flag = getFlag(code);
  return `${flag.emoji} ${"  " + flag.name}`;
};

export const getEmoji = (code) => {
  const flag = getFlag(code);
  return flag.emoji;
};

export const getLanguage = (code) => {
  const lang = languages.find((language) => language.code === code);
  return lang.name;
};
